import { getRecord, months, El } from "./utils.js";
import { bodyEmptyArr } from "./constants.js";
const budgetsArray = [...getRecord('budget').values()];
const expensesArray = [...getRecord('records').values()];
const categories = ['Utilities', 'Groceries', 'Entertainment', 'Transport', 'Other'];
const allDates = getAllDates(budgetsArray, expensesArray);
allDates.sort(dateSort);
const sortedUniqueDates = [...new Set(allDates)];
let startIndex = 0;

render(startIndex, sortedUniqueDates);

const buttons = document.querySelectorAll('button.action');
const [previousButton, nextButton] = [...buttons];


previousButton.addEventListener('click', function (e) {
    if (startIndex < 3) return;
    startIndex -= 3;
    render(startIndex, sortedUniqueDates);
});

nextButton.addEventListener('click', function (e) {
    if (startIndex > sortedUniqueDates.length - 3) return;
    startIndex += 3;
    render(startIndex, sortedUniqueDates);
});


function getAllDates(budgetArr, expensesArr) {
    const allDates = [];
    expensesArr.forEach(exp => {
        const dateArr = exp.date.split('.');
        dateArr.shift();
        const newDate = dateArr.join('.')
        exp.date = newDate;
        allDates.push(newDate);
    });
    budgetArr.forEach(budget => {
        const budgetDate = budget.date;
        allDates.push(budgetDate);
    });
    return allDates;
}


function dateSort(dateString1, dateString2) {
    const [month1, year1] = dateString1.split('.');
    const [month2, year2] = dateString2.split('.');
    return year1 - year2 || months.indexOf(month1) - months.indexOf(month2);
}


function getPeriod(sortedDates, startIndex = 0) {
    return sortedDates.slice(startIndex, Math.min(sortedDates.length, startIndex + 3));
}

function dateToMonthConverter(dateArr) {
    return dateArr.map(x => x.split('.')[0]);
}

function getBodyData(slicedDates, bodyDdata) {
    const width = bodyDdata[0].length;
    const height = bodyDdata.length;
    let totalExpenses = 0;
    expensesArray.forEach((exp) => {
        const expDate = exp.date;
        slicedDates.forEach((slicedDate, dateIndex) => {
            if (slicedDate === expDate) {
                const amount = Number(exp.amount);
                const category = exp.categories;
                const categoryIndex = categories.indexOf(category);
                bodyDdata[categoryIndex][dateIndex] += amount;
                bodyDdata[categoryIndex][width - 1] += amount;
                bodyDdata[height - 1][dateIndex] += amount;
                totalExpenses += amount;
            }
        });
    })
    bodyDdata[height - 1][width - 1] = totalExpenses;
    return bodyDdata;
}

function getFooterData(total, budgetArr, dates) {
    const footerHeight = 3;
    const footerWidth = total.length;
    const footerArr = [...Array(footerHeight)].map(e => Array(footerWidth).fill(0));
    footerArr[0] = total;
    budgetArr.forEach((record) => {
        const budgetDate = record.date;
        dates.forEach((d, di) => {
            if (d === budgetDate) {
                const income = Number(record.income);
                const budget = Number(record.budget);
                footerArr[1][di] += budget;
                footerArr[2][di] += income;
            }
        });
    });
    for (let t = 0; t < total.length; t++) {
        if (total[t] !== 0) {
            footerArr[1][t] = -1 * Math.min(footerArr[1][t] - total[t], 0);
            footerArr[2][t] = Math.max(footerArr[2][t] - total[t], 0);
        }
    }
    return footerArr;
}

function render(startIndex, sortedUniqueDates) {
    const slicedDates = getPeriod(sortedUniqueDates, startIndex);
    const length = slicedDates.length;
    const bodyDdata = bodyEmptyArr(length + 1);
    const headerMonths = dateToMonthConverter(slicedDates);
    const bodyData = getBodyData(slicedDates, bodyDdata);
    const totalSpent = bodyData.pop();
    const footerData = getFooterData(totalSpent, budgetsArray, slicedDates);
    const t = document.getElementsByClassName('editor')[0];
    const newBody = createTableBody(bodyData);
    const body = t.querySelector('tbody');
    const headers = t.querySelector('thead');
    const newHeaders = createTableHeaders(['Category', ...headerMonths, 'Total']);
    const footer = t.querySelector('tfoot');
    const newFooter = createTableFooter(footerData);
    t.replaceChild(newHeaders, headers);
    t.replaceChild(newBody, body);
    t.replaceChild(newFooter, footer);
}

function createTableFooter(footerData) {
    const footer = document.createElement('tfoot');
    const currencyIndices = [0, 1, 2, 3];
    const totalSpent = createTableRow(footerData[0], currencyIndices, 'Total Spent');
    totalSpent.classList.add('total');
    const budgetOverruns = createTableRow(footerData[1], currencyIndices, 'Budget overruns');
    budgetOverruns.classList.add('overrun');
    const savings = createTableRow(footerData[2], currencyIndices, 'Savings');
    savings.classList.add('savings');
    footer.appendChild(totalSpent);
    footer.appendChild(budgetOverruns)
    footer.appendChild(savings);
    return footer;
}

function createTableBody(tableData) {
    const tbody = document.createElement('tbody');
    tableData.forEach((tableRow, i) => {
        const currencyIndices = [0, 1, 2, 3];
        const row = createTableRow(tableRow, currencyIndices, categories[i]);
        tbody.appendChild(row);
    })
    return tbody;
}

function createTableHeaders(headers) {
    const thead = document.createElement('thead');
    const row = document.createElement('tr');
    headers.forEach(h => {
        const td = El('td', {}, h);
        row.appendChild(td);
    })
    thead.appendChild(row);
    return thead;
}

function createTableRow(tabledataArray, indicesArray, th) {
    const tr = document.createElement('tr');
    if (th) {
        const header = El('th', {}, th);
        tr.appendChild(header);
    }
    tabledataArray.forEach((element, index) => {
        const td = document.createElement('td');
        if (indicesArray.includes(index)) {
            const span = El('span', { className: 'currency' }, element);
            td.appendChild(span);
        } else {
            td.textContent = element;
        }
        tr.appendChild(td);
    });
    return tr;
}