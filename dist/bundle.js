/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./js/budget.js ***!
  \**********************/
//Date.prototype.toLocaleDateString()--
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const categories = { "Other": 0, "Utilities": 1, "Groceries": 2, "Entertainment": 3, "Transport": 4 }
document.getElementsByClassName('editor')[0].addEventListener('click', function (e) {
    const row = e.target.parentElement.parentElement;
    const [date, name, category, amount] = [...row.children].slice(0, 4).map(x => x.textContent);
    document.querySelector('[name="date"]').value = convertDatestring(date);
    document.querySelector('[name="name"]').value = name;
    document.querySelector('[name="category"]').value = categories[category];
    document.querySelector('[name="amount"]').value = amount;
})

function convertDatestring(dateString) {
    const currentYear = new Date().getFullYear();
    const [d, monthIndex] = dateString.split('.');
    date = ('0' + d).slice(-2);
    const month = ('0' + months.indexOf(monthIndex)).slice(-2);
    return (`${currentYear}-${month}-${date}`)
}

function truncateDate(dateString){
    const date = new Date(dateString);
    const day = date.getDay();
    const month = Months(date.getMonth());
    return `${day}.${month}`;
}


/******/ })()
;
//# sourceMappingURL=bundle.js.map