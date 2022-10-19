import { getRecord, months } from "./utils.js"
const budgetsArray = [...getRecord('budget').values()];
const expensesArray = [...getRecord('records').values()];
const categories = ['Utilities', 'Groceries', 'Entertainment', 'Transport', 'Other'];
console.log('expenses', expensesArray);

console.log('budget', budgetsArray);
const summary = {};

const budgetTransformed = transformBudget();
console.log(JSON.stringify(budgetTransformed));


addExpensesToBudget();
console.log(JSON.stringify(budgetTransformed));

const table = getTableData(budgetTransformed);
console.log('table=', JSON.stringify(table));

function getTableData(budget, start = 0) {
    const table = [[], [], [], [], [], []];
    const sums = [0, 0, 0, 0, 0, 0];
    const end = start + 3;
    const allYearsBudgets = Object.values(budget);
    console.log(allYearsBudgets);
    for (let i = 0; i < allYearsBudgets.length; i++) {
        const yearBudget = allYearsBudgets[i];
        console.log(yearBudget);
        const sortedMonths = Object.keys(yearBudget).sort((a, b) => months.indexOf(a) - months.indexOf(b));
        console.log('sorted months=', sortedMonths);
        for (let j = 0; j < sortedMonths.length; j++) {
            if (start === end) return table;
            const month = sortedMonths[i];
            const monthBudget = yearBudget[month];
            console.log('month = ', month, ' monthBudget = ', monthBudget);
            for (let k = 0; k < 6; k++) {
                table[k].push(monthBudget[k]);
            }
            start++;
        }
    }
}


function addExpensesToBudget() {
    expensesArray.forEach(exp => {
        const [day, month, year] = exp[0].split('.');
        const category = exp[2];
        const categoryIndex = categories.indexOf(category);
        const amount = Number(exp[3]);
        console.log(budgetTransformed[year]);
        const monthSummaryArray = (budgetTransformed[year])[month];
        if (monthSummaryArray) { //if there is a budget for that month
            monthSummaryArray[categoryIndex] += amount;
            const totalSpentIndex = 5;
            monthSummaryArray[totalSpentIndex] += amount;
            const budgetOverrunsIndex = 6;
            monthSummaryArray[budgetOverrunsIndex] = monthSummaryArray[budgetOverrunsIndex] - amount > 0 ? 0 :
                amount - monthSummaryArray[budgetOverrunsIndex];

        }
    });
}


function transformBudget() {
    const budgetTransformed = {};
    budgetsArray.forEach(b => {
        const [month, year] = b[0].split('.');
        const income = Number(b[1]);
        const budget = Number(b[2]);
        console.log(`month=${month}   year=${year}`);
        if (budgetTransformed.hasOwnProperty(year)) {
            (budgetTransformed[year])[month] = [0, 0, 0, 0, 0, 0, budget, income];
        } else {
            budgetTransformed[year] = { [month]: [0, 0, 0, 0, 0, 0, budget, income] };
        }
    });
    return budgetTransformed;
}
