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
            const span = El('span', {}, element);
            span.classList.add('currency');
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
/*!**********************!*\
  !*** ./js/budget.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./js/utils.js");

//alert('yes')
const budgetForm = document.getElementById('new-budget');
const budgetTable = document.getElementsByClassName('editor')[0];
let rowToReplace = null;


const records = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRecord)('budget');
budgetTable.addEventListener('click', function (e) {
    const buttonText = e.target.textContent;
    const row = e.target.parentElement.parentElement;
    if (buttonText === 'Delete') {
        row.remove();
    } else {
        const [month, income, budget] = [...row.children].slice(0, 3).map(x => x.textContent);
        document.querySelector('[name="month"]').value = monthStringConvertor(month);
        document.querySelector('[name="income"]').value = income;
        document.querySelector('[name="budget"]').value = budget;
        rowToReplace = row;
    }
})

function monthStringConvertor(monthString) {
    const [month, year] = monthString.split('.');
    const index = _utils_js__WEBPACK_IMPORTED_MODULE_0__.months.indexOf(month) + 1;
    const mm = ('0' + index).slice(0, 2);
    return `${mm}-${year}`;
}

budgetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getFormData)(e, 'month');
    try {
        validateBudgetData(data)
    } catch (err) {
        alert(err.message)
        return;
    }
    const id = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getId)();
    const rowData = parseBudgetData(data);
    console.log('rowdata= ', rowData)
    records.set(id, rowData);
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.setRecord)(records, 'budget');
    upsertRow(budgetTable, rowData, [1, 2]);
});

function upsertRow(table, rowData, currencyIndices) {
    const row = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createTableRow)(rowData, currencyIndices);
    console.log('row=', row);
    if (rowToReplace) {
        table.querySelector('tbody').replaceChild(row, rowToReplace);
        rowToReplace = null;
    } else {
        table.querySelector('tbody').appendChild(row);
    }
}

function parseBudgetData(data) {
    const monthYearArr = data.month.split('-');
    const monthIndex = parseInt(monthYearArr[0]) - 1;
    const year = parseInt(monthYearArr[1]);
    const month = `${_utils_js__WEBPACK_IMPORTED_MODULE_0__.months[monthIndex]}.${year}`;
    return [month, data.income, data.budget];
}

function validateBudgetData(data) {
    if (data.month.trim() === '') {
        throw new Error('month can not be emty');
    }
    else {
        const { income, budget } = data;
        const monthYearArr = data.month.split('-');
        const month = parseInt(monthYearArr[0]);
        const year = parseInt(monthYearArr[1]);
        if (!month) throw new Error('month is not a number');
        if (month > 12 || month < 1) throw new RangeError('month out of range');
        if (!year) throw new Error('year is not anumber');
        if (year > (new Date()).getFullYear || year < 1969) throw new RangeError('year out of range');
        if (income <= 0) throw new RangeError('income should be positive');
        if (budget <= 0) throw new RangeError('budget should be positive');
    }
}
})();

/******/ })()
;
//# sourceMappingURL=budget.bundle.js.map