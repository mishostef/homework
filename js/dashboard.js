import { El, getRecord } from "./utils.js";
const budgetsArray = [...getRecord('budget').values()];
const expensesArray = [...getRecord('records').values()];
const budgetsums = getBugetSums(budgetsArray);
const expenses = getBreakdown(expensesArray);
const maxExpense = Math.max(...Object.values(expenses));

const spent = expenses.Total;
const remaining = Math.max(budgetsums.budget - spent, 0);
const savings = Math.max(budgetsums.income - spent, 0);
setRowValues(spent, remaining, savings);
resizeBarChart(expenses);
resizeSummaryColumn(spent, remaining, savings);

function resizeBarChart(expenses) {
    const rows = Object.entries(expenses).map(([name, value]) => createSummaryRow(name, value, maxExpense));
    document.querySelector('.breakdown').replaceChildren(...rows);
}

function resizeSummaryColumn(spent, remaining, savings) {
    const summaryColumn = document.getElementsByClassName('right-col')[0];
    [...summaryColumn.children].forEach((x, i) => {
        const current = [spent, remaining, savings][i];
        const height = (300 * current / (spent + remaining + savings)) | 0;
        x.style.height = height + 'px';
        return x;
    });
}

function setRowValues(spent, remaining, savings) {
    const arr = [spent, remaining, savings, ...Object.values(expenses)];
    [...document.querySelectorAll('.cat-row span.row.value')].forEach((x, i) => x.textContent = arr[i] | 0);
}

function getBugetSums(budgetsArray) {
    let income = 0;
    let budget = 0;
    budgetsArray.forEach(record => {
        income += Number(record.income);
        budget += Number(record.budget);
    });
    return { income, budget };
}

function getBreakdown(expensesArray) {
    const expenses = {
        Utilities: 0, Groceries: 0,
        Entertainment: 0, Transport: 0, Other: 0, Total: 0
    };
    expensesArray.forEach(expense => {
        const category = expense.categories;
        const spent = Number(expense.amount);
        expenses[category] += spent;
        expenses.Total += spent;
    })
    return expenses;
}

function createSummaryRow(name, value, maxValue) {
    const bar = El('span', { className: 'bar' });
    bar.style.width = `${value / maxValue * 400 | 0}px`;
    const result = El('div', { className: 'cat-row' },
        El('span', { className: 'row label' }, name),
        El('span', { className: 'row value' }, value),
        El('div', { className: 'bar-area' }, bar),
    );
    return result;
}