/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/utils.js":
/*!*********************!*\
  !*** ./js/utils.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "El": () => (/* binding */ El),
/* harmony export */   "convertDatestring": () => (/* binding */ convertDatestring),
/* harmony export */   "createTableRow": () => (/* binding */ createTableRow),
/* harmony export */   "dateToString": () => (/* binding */ dateToString),
/* harmony export */   "getFormData": () => (/* binding */ getFormData),
/* harmony export */   "getId": () => (/* binding */ getId),
/* harmony export */   "getRecord": () => (/* binding */ getRecord),
/* harmony export */   "months": () => (/* binding */ months),
/* harmony export */   "setRecord": () => (/* binding */ setRecord),
/* harmony export */   "truncateDate": () => (/* binding */ truncateDate),
/* harmony export */   "validateData": () => (/* binding */ validateData)
/* harmony export */ });
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const getId = () => ('00000000' + Math.random() * 99999999 | 0).toString().slice(-8);

const getRecord = (lsKey) => {
    const records = localStorage.getItem(lsKey);
    if (!records || records === '{}') return new Map();
    const values = JSON.parse(records);
    return new Map(values);
}
const setRecord = (map, lsKey) => {
    const entries = JSON.stringify([...map.entries()]);
    localStorage.setItem(lsKey, entries);
}

function truncateDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${day}.${month}`;
}

function validateData(name, amount) {
    if (name.trim() === '') {
        throw new Error('Name cannot be empty');
    }
    if (amount === '') {
        throw new Error('Amount cannot be empty');
    }
    if (Number(amount) <= 0) {
        throw new Error('Amount should be positive');
    }
}

function convertDatestring(dateString) {
    const currentYear = new Date().getFullYear();
    const [d, monthIndex] = dateString.split('.');
    const date = ('0' + d).slice(-2);
    const month = ('0' + (months.indexOf(monthIndex) + 1)).slice(-2);
    return (`${currentYear}-${month}-${date}`);
}

function getFormData(e) {
    const formData = new FormData(e.target);
    const data = (Object.fromEntries(formData));
    return data;
}
function dateToString(date) {
    const d = date.getDate();
    const yyyy = date.getFullYear();
    const monthIndex = months[date.getMonth() + 1];
    const dd = ('0' + d).slice(-2);
    const mm = ('0' + months.indexOf(monthIndex)).slice(-2);
    return (`${yyyy}-${mm}-${dd}`);
}

function El(typeStr, attributesObj, ...content) {
    const parent = document.createElement(typeStr);
    for (let key in attributesObj) {
        if (key.startsWith('on')) {
            parent.addEventListener(key.slice(2), attributesObj[key]);
        } else {
            parent[key] = attributesObj[key];
        }
    }
    for (let item of content) {
        parent.append(item)
    }
    return parent;
}

function createTableRow(tabledataArray, indicesArray) {
    const tr = document.createElement('tr');
    tabledataArray.forEach((element, index) => {
        const td = document.createElement('td');
        if (indicesArray.includes(index)) {
            const span = El('span', {className:'currency'}, element);
            td.appendChild(span);
        } else {
            td.textContent = element;
        }
        tr.appendChild(td);
    });

    const buttonEdit = El('button', {}, 'Edit');
    const buttonDelete = El('button', {}, 'Delete');
    const buttonTD = El('td', {}, buttonEdit, buttonDelete);
    tr.appendChild(buttonTD);
    return tr;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./js/dashboard.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./js/utils.js");

const budgetsArray = [...(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRecord)('budget').values()];
const expensesArray = [...(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRecord)('records').values()];
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
    [...summaryColumn.children].forEach(x => x.style.height *= 300 / Math.max(spent, remaining, savings));
}

function setRowValues(spent, remaining, savings) {
    const arr = [spent, remaining, savings, ...Object.values(expenses)];
    [...document.querySelectorAll('.cat-row span.row.value')].forEach((x, i) => x.textContent = arr[i] | 0);
}

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
    const bar = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.El)('span', { className: 'bar' });
    bar.style.width = `${value / maxValue * 400 | 0}px`;
    const result = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.El)('div', { className: 'cat-row' },
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.El)('span', { className: 'row label' }, name),
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.El)('span', { className: 'row value' }, value),
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.El)('div', { className: 'bar-area' }, bar),
    );
    return result;
}
})();

/******/ })()
;
//# sourceMappingURL=dashboard.bundle.js.map