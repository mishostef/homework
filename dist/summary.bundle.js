/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/constants.js":
/*!*************************!*\
  !*** ./js/constants.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bodyEmptyArr": () => (/* binding */ bodyEmptyArr),
/* harmony export */   "footerEmptyArr": () => (/* binding */ footerEmptyArr)
/* harmony export */ });
const bodyEmptyArr = (n)=>[
    new Array(n).fill(0),//utils
    new Array(n).fill(0),//groc
    new Array(n).fill(0),//ent
    new Array(n).fill(0),//trans
    new Array(n).fill(0),//other
    new Array(n).fill(0),//total
];
const footerEmptyArr = (n)=> [...Array(3)].map(e => Array(n).fill(0));

/***/ }),

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
/*!***********************!*\
  !*** ./js/summary.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./js/utils.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.js */ "./js/constants.js");


const budgetsArray = [...(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRecord)('budget').values()];
const expensesArray = [...(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRecord)('records').values()];
const categories = ['Utilities', 'Groceries', 'Entertainment', 'Transport', 'Other'];
const allDates = getAllDates(budgetsArray, expensesArray);
allDates.sort(dateSort);
const sortedUniqueDates = [...new Set(allDates)];
let startIndex = 0;

render(startIndex, sortedUniqueDates);

const buttons = document.querySelectorAll('button.action');
const [previousButton, nextButton] = [...buttons];


previousButton.addEventListener('click', function (e) {
    if (startIndex < 3) return;
    startIndex -= 3;
    render(startIndex, sortedUniqueDates);
});

nextButton.addEventListener('click', function (e) {
    if (startIndex > sortedUniqueDates.length - 3) return;
    startIndex += 3;
    render(startIndex, sortedUniqueDates);
});


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
    return year1 - year2 || _utils_js__WEBPACK_IMPORTED_MODULE_0__.months.indexOf(month1) - _utils_js__WEBPACK_IMPORTED_MODULE_0__.months.indexOf(month2);
}


function getPeriod(sortedDates, startIndex = 0) {
    return sortedDates.slice(startIndex, Math.min(sortedDates.length, startIndex + 3));
}

function dateToMonthConverter(dateArr) {
    return dateArr.map(x => x.split('.')[0]);
}

function getBodyData(slicedDates, bodyDdata) {
    const width = bodyDdata[0].length;
    const height = bodyDdata.length;
    let totalExpenses = 0;
    expensesArray.forEach((exp) => {
        const expDate = exp[0];
        slicedDates.forEach((slicedDate, dateIndex) => {
            if (slicedDate === expDate) {
                const amount = Number(exp[3]);
                const category = exp[2];
                const categoryIndex = categories.indexOf(category);
                bodyDdata[categoryIndex][dateIndex] += amount;
                bodyDdata[categoryIndex][width - 1] += amount;
                bodyDdata[height - 1][dateIndex] += amount;
                totalExpenses += amount;
            }
        });
    })
    bodyDdata[height - 1][width - 1] = totalExpenses;
    return bodyDdata;
}

function getFooterData(total, budgetArr, dates) {
    const footerHeight = 3;
    const footerWidth = total.length;
    const footerArr = [...Array(footerHeight)].map(e => Array(footerWidth).fill(0));
    footerArr[0] = total;
    budgetArr.forEach((record) => {
        const budgetDate = record[0];
        dates.forEach((d, di) => {
            if (d === budgetDate) {
                const income = Number(record[1]);
                const budget = Number(record[2]);
                footerArr[1][di] += budget;
                footerArr[2][di] += income;
            }
        });
    });
    for (let t = 0; t < total.length; t++) {
        if (total[t] !== 0) {
            footerArr[1][t] = -1 * Math.min(footerArr[1][t] - total[t], 0);
            footerArr[2][t] = Math.max(footerArr[2][t] - total[t], 0);
        }
    }
    return footerArr;
}

function render(startIndex, sortedUniqueDates) {
    const slicedDates = getPeriod(sortedUniqueDates, startIndex);
    const length = slicedDates.length;
    const bodyDdata = (0,_constants_js__WEBPACK_IMPORTED_MODULE_1__.bodyEmptyArr)(length + 1);
    const headerMonths = dateToMonthConverter(slicedDates);
    const bodyData = getBodyData(slicedDates, bodyDdata);
    const totalSpent = bodyData.pop();
    const footerData = getFooterData(totalSpent, budgetsArray, slicedDates);
    const t = document.getElementsByClassName('editor')[0];
    const newBody = createTableBody(bodyData);
    const body = t.querySelector('tbody');
    const headers = t.querySelector('thead');
    const newHeaders = createTableHeaders(['Category', ...headerMonths, 'Total']);
    const footer = t.querySelector('tfoot');
    const newFooter = createTableFooter(footerData);
    t.replaceChild(newHeaders, headers);
    t.replaceChild(newBody, body);
    t.replaceChild(newFooter, footer);
}

function createTableFooter(footerData) {
    const footer = document.createElement('tfoot');
    const currencyIndices = [0, 1, 2, 3];
    const totalSpent = createTableRow(footerData[0], currencyIndices, 'Total Spent');
    totalSpent.classList.add('total');
    const budgetOverruns = createTableRow(footerData[1], currencyIndices, 'Budget overruns');
    budgetOverruns.classList.add('overrun');
    const savings = createTableRow(footerData[2], currencyIndices, 'Savings');
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
        const td = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.El)('td', {}, h);
        row.appendChild(td);
    })
    thead.appendChild(row);
    return thead;
}

function createTableRow(tabledataArray, indicesArray, th) {
    const tr = document.createElement('tr');
    if (th) {
        const header = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.El)('th', {}, th);
        tr.appendChild(header);
    }
    tabledataArray.forEach((element, index) => {
        const td = document.createElement('td');
        if (indicesArray.includes(index)) {
            const span = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.El)('span', { className: 'currency' }, element);
            td.appendChild(span);
        } else {
            td.textContent = element;
        }
        tr.appendChild(td);
    });
    return tr;
}
})();

/******/ })()
;
//# sourceMappingURL=summary.bundle.js.map