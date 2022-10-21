import { getFormData, getId, months, createTableRow, getRecord, setRecord } from "./utils.js";
const budgetForm = document.getElementById('new-budget');
const budgetTable = document.getElementsByClassName('editor')[0];
let rowToReplace = null;


const records = getRecord('budget');
hydrate()
function hydrate() {
    const tbody = document.getElementsByTagName('tbody')[0];
    tbody.replaceChildren(...[...records.values()].map(x => createTableRow(x, [1, 2])));
}
budgetTable.addEventListener('click', function (e) {
    const buttonText = e.target.textContent;
    const row = e.target.parentElement.parentElement;
    if (buttonText === 'Delete') {
        row.remove();
    } else {
        const [month, income, budget] = [...row.children].slice(0, 3).map(x => x.textContent);
        document.querySelector('[name="month"]').value = monthStringConvertor(month);
        document.querySelector('[name="income"]').value = income;
        document.querySelector('[name="budget"]').value = budget;
        rowToReplace = row;
    }
})

function monthStringConvertor(monthString) {
    const [month, year] = monthString.split('.');
    const index = months.indexOf(month) + 1;
    const mm = ('0' + index).slice(0, 2);
    return `${mm}-${year}`;
}

budgetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = getFormData(e, 'month');
    try {
        validateBudgetData(data)
    } catch (err) {
        alert(err.message)
        return;
    }
    const id = getId();
    const rowData = parseBudgetData(data);
    records.set(id, rowData);
    setRecord(records, 'budget');
    upsertRow(budgetTable, rowData, [1, 2]);
});

function upsertRow(table, rowData, currencyIndices) {
    const row = createTableRow(rowData, currencyIndices);
    if (rowToReplace) {
        table.querySelector('tbody').replaceChild(row, rowToReplace);
        rowToReplace = null;
    } else {
        table.querySelector('tbody').appendChild(row);
    }
}

function parseBudgetData(data) {
    const monthYearArr = data.month.split('-');
    const monthIndex = parseInt(monthYearArr[0]) - 1;
    const year = parseInt(monthYearArr[1]);
    const month = `${months[monthIndex]}.${year}`;
    return [month, data.income, data.budget];
}

function validateBudgetData(data) {
    if (data.month.trim() === '') {
        throw new Error('month can not be emty');
    }
    else {
        const { income, budget } = data;
        const monthYearArr = data.month.split('-');
        const month = parseInt(monthYearArr[0]);
        const year = parseInt(monthYearArr[1]);
        if (!month) throw new Error('month is not a number');
        if (month > 12 || month < 1) throw new RangeError('month out of range');
        if (!year) throw new Error('year is not anumber');
        if (year > (new Date()).getFullYear || year < 1969) throw new RangeError('year out of range');
        if (income <= 0) throw new RangeError('income should be positive');
        if (budget <= 0) throw new RangeError('budget should be positive');
    }
}