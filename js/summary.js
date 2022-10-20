import { getRecord, months, El } from "./utils.js";
import { bodyDdata } from "./constants.js";
const budgetsArray = [...getRecord('budget').values()];
const expensesArray = [...getRecord('records').values()];
const categories = ['Utilities', 'Groceries', 'Entertainment', 'Transport', 'Other'];
console.log('expenses', expensesArray);

console.log('budget', budgetsArray);
const allDates = getAllDates(budgetsArray, expensesArray);
allDates.sort(dateSort);
const sortedUnique = [...new Set(allDates)];
console.log(sortedUnique);
const slicedDates = getPeriod(sortedUnique, 6);
console.log(slicedDates);
console.log(dateToMonthConverter(slicedDates));
const bodyData = getBodyData(slicedDates, bodyDdata);
console.log('expenses array', expensesArray);
console.log(bodyData);

function getAllDates(budgetArr, expensesArr) {
    const allDates = [];
    expensesArr.forEach(exp => {
        const dateArr = exp[0].split('.');
        dateArr.shift();
        const newDate = dateArr.join('.')
        exp[0] = newDate;
        allDates.push(newDate);
    });
    budgetArr.forEach(budget => {
        const budgetDate = budget[0];
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
///za header
function dateToMonthConverter(dateArr) {
    return dateArr.map(x => x.split('.')[0]);
}
//za body
function getBodyData(slicedDates, bodyDdata) {
    // const bodyDdata = [
    //     [0, 0, 0, 0],//utils
    //     [0, 0, 0, 0],//groc
    //     [0, 0, 0, 0],//ent
    //     [0, 0, 0, 0],//trans
    //     [0, 0, 0, 0],//other
    //     [0, 0, 0, 0],//total
    // ];

    console.log(slicedDates);
    expensesArray.forEach((exp) => {
        const expDate = exp[0];
        slicedDates.forEach((slicedDate, dateIndex) => {
            if (slicedDate === expDate) {
                const amount = Number(exp[3]);
                const category = exp[2];
                const categoryIndex = categories.indexOf(category);
                bodyDdata[categoryIndex][dateIndex] += amount;
                bodyDdata[categoryIndex][3] += amount;
                bodyDdata[5][dateIndex] += amount;
            }
        })

    })
    return bodyDdata;
}




const t = document.getElementsByClassName('editor')[0];

const tableData = bodyData;
const footerData = [
    [380, 410, 360, 1150],
    [510, 480, 535, 1525],
    [510, 480, 535, 1525],
]
const newBody = createTableBody(tableData);
const body = t.querySelector('tbody');
const headers = t.querySelector('thead');
const newHeaders = createTableHeaders(['Category', 'Jan', 'Feb', 'Mar', 'Total']);
const footer = t.querySelector('tfoot');
const newFooter = createTableFooter(footerData);

t.replaceChild(newHeaders, headers);
t.replaceChild(newBody, body);
t.replaceChild(newFooter, footer);




function createTableFooter(footerData) {
    const footer = document.createElement('tfoot');
    const currencyIndices = [0, 1, 2, 3];
    const totalSpent = createTableRow(footerData[0], currencyIndices, 'Total Spent');
    totalSpent.classList.add('total');
    const budgetOverruns = createTableRow(footerData[0], currencyIndices, 'Budget overruns');
    budgetOverruns.classList.add('overrun');
    const savings = createTableRow(footerData[0], currencyIndices, 'Savings');
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
            const span = El('span', {}, element);
            span.classList.add('currency');
            td.appendChild(span);
        } else {
            td.textContent = element;
        }
        tr.appendChild(td);
    });
    return tr;
}