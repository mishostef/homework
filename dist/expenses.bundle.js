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
/*!************************!*\
  !*** ./js/expenses.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./js/utils.js");



const categories = { "Other": 0, "Utilities": 1, "Groceries": 2, "Entertainment": 3, "Transport": 4 }
const expensesTable = document.getElementsByClassName('editor')[0];
let rowToReplace = null;

expensesTable.addEventListener('click', function (e) {
    const buttonText = e.target.textContent;
    const row = e.target.parentElement.parentElement;
    if (buttonText === 'Delete') {
        row.remove();
    } else {
        const [date, name, category, amount] = [...row.children].slice(0, 4).map(x => x.textContent);
        document.querySelector('[name="date"]').value = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.convertDatestring)(date);
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
    tbody.replaceChildren(...[...records.values()].map(x=>(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createTableRow)(x,[3])));
}
expensesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getFormData)(e);
    if (!data.date) {
        data.date = new Date();
        document.querySelector('[name="date"]').value = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.dateToString)(new Date());
    }
    try {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.validateData)(data.name, data.amount)
    } catch (err) {
        alert(err.message)
        return;
    }
    const id = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getId)();
    const rowData = parseExpensesData(data);
    const storageData = rowData.slice();
    storageData[0] = `${storageData[0]}.${new Date(data.date).getFullYear()}`;
    records.set(id, storageData);
    setExpenses(records);
    const row = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createTableRow)(rowData, [3]);
    if (rowToReplace) {
        expensesTable.querySelector('tbody').replaceChild(row, rowToReplace);
        rowToReplace = null;
    } else {
        expensesTable.querySelector('tbody').appendChild(row);
    }
})

function parseExpensesData(data) {
    return [(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.truncateDate)(data.date), data.name, Object.keys(categories)[+data.category], data.amount];
}
})();

/******/ })()
;
//# sourceMappingURL=expenses.bundle.js.map