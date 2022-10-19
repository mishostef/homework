import { setRecord, getRecord } from "./utils.js";
const budgetsArray = [...getRecord('budget').values()];
const expensesArray = [...getRecord('records').values()];
console.log(budgetsArray);
console.log(expensesArray);

const budgetsums = getBugetSums(budgetsArray);
console.log(JSON.stringify(budgetsums));
const expenses = getBreakdown(expensesArray);
console.log(JSON.stringify(expenses));

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
    const expenses = {};
    expensesArray.forEach(expense => {
        const category = expense[2];
        const spent = Number(expense[3]);
        console.log('category=', category);
        console.log('spent=', spent);
        if (expenses.hasOwnProperty(category)) {
            expenses[category] += spent;
        } else {
            expenses[category] = spent;
        }
    })
    return expenses;
}