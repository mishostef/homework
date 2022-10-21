import { El, getRecord } from "./utils.js";
const budgetsArray = [...getRecord('budget').values()];
const expensesArray = [...getRecord('records').values()];
const budgetsums = getBugetSums(budgetsArray);

const expenses = getBreakdown(expensesArray);
const maxExpense = Math.max(...Object.values(expenses));
const rows = Object.entries(expenses).map(([name, value]) => createSummaryRow(name, value, maxExpense));
console.log(rows);
document.querySelector('.breakdown').replaceChildren(...rows);
const spent = expenses.Total;
const remaining = Math.max(budgetsums.budget - spent, 0);
const savings = Math.max(budgetsums.income - spent, 0);
const arr = [spent, remaining, savings, ...Object.values(expenses)];
[...document.querySelectorAll('.cat-row span.row.value')].forEach((x, i) => x.textContent = arr[i]);


function getBugetSums(budgetsArray) {
    let income = 0;
    let budget = 0;
    budgetsArray.forEach(record => {
        income += Number(record[1]);
        budget += Number(record[2]);
    });
    return { income, budget };
}

function getBreakdown(expensesArray) {
    const expenses = {
        Utilities: 0, Groceries: 0,
        Entertainment: 0, Transport: 0, Other: 0, Total: 0
    };
    expensesArray.forEach(expense => {
        const category = expense[2];
        const spent = Number(expense[3]);
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

{/* <div class="cat-row">
<span class="row label">Entertainment</span>
<span class="row value">150</span>
<div class="bar-area">
    <span class="bar" style="width: 150px"></span>
</div>
</div> */}