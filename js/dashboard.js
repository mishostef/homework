import { getRecord } from "./utils.js";
const budgetsArray = [...getRecord('budget').values()];
const expensesArray = [...getRecord('records').values()];
console.log(budgetsArray);
console.log(expensesArray);

const budgetsums = getBugetSums(budgetsArray);
console.log(JSON.stringify(budgetsums));
const expenses = getBreakdown(expensesArray);
console.log(JSON.stringify(expenses));
const spent = expenses.Total;
const remaining = Math.max(budgetsums.budget - spent, 0);
const savings = Math.max(budgetsums.income - spent, 0);
const arr = [spent, remaining, savings, ...Object.values(expenses)];
console.log(arr);
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
        console.log('category=', category);
        console.log('spent=', spent);
        expenses[category] += spent;
        expenses.Total += spent;
    })
    return expenses;
}