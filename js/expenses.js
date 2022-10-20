import {
    months, truncateDate, getId, validateData, convertDatestring,
    getFormData, dateToString, createTableRow
} from "./utils.js";


const categories = { "Other": 0, "Utilities": 1, "Groceries": 2, "Entertainment": 3, "Transport": 4 }
const expensesTable = document.getElementsByClassName('editor')[0];
let rowToReplace = null;
//edit event on table
expensesTable.addEventListener('click', function (e) {
    const buttonText = e.target.textContent;
    const row = e.target.parentElement.parentElement;
    if (buttonText === 'Delete') {
        row.remove();
    } else {
        const [date, name, category, amount] = [...row.children].slice(0, 4).map(x => x.textContent);
        document.querySelector('[name="date"]').value = convertDatestring(date);
        document.querySelector('[name="name"]').value = name;
        document.querySelector('[name="category"]').value = categories[category];
        document.querySelector('[name="amount"]').value = amount;
        rowToReplace = row;
    }
})

const expensesForm = document.getElementById('new-expense');

const getExpenses = () => {
    const records = localStorage.getItem('records');
    if (!records || records === '{}') return new Map();
    const values = JSON.parse(records);
    return new Map(values);
}
const setExpenses = (map) => {
    const entries = JSON.stringify([...map.entries()]);
    localStorage.setItem('records', entries);
}
const records = getExpenses();

hydrate()
function hydrate() {
    const tbody = document.getElementsByTagName('tbody')[0];
    tbody.replaceChildren(...[...records.values()].map(x=>createTableRow(x,[3])));
}
expensesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = getFormData(e);
    if (!data.date) {
        data.date = new Date();
        document.querySelector('[name="date"]').value = dateToString(new Date());
    }
    try {
        validateData(data.name, data.amount)
    } catch (err) {
        alert(err.message)
        return;
    }
    const id = getId();
    const rowData = parseExpensesData(data);
    console.log('rowdata= ', rowData);
    const storageData = rowData.slice();
    storageData[0] = `${storageData[0]}.${new Date(data.date).getFullYear()}`;
    records.set(id, storageData);
    setExpenses(records);
    const row = createTableRow(rowData, [3]);
    if (rowToReplace) {
        expensesTable.querySelector('tbody').replaceChild(row, rowToReplace);
        rowToReplace = null;
    } else {
        expensesTable.querySelector('tbody').appendChild(row);
    }
})

function parseExpensesData(data) {
    return [truncateDate(data.date), data.name, Object.keys(categories)[+data.category], data.amount];
}

