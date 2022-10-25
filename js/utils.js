export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const getId = () => ('00000000' + Math.random() * 99999999 | 0).toString().slice(-8);

export const getRecord = (lsKey) => {
    const records = localStorage.getItem(lsKey);
    if (!records || records === '{}') return new Map();
    const values = JSON.parse(records);
    return new Map(Object.entries(values));
}
export const setRecord = (map, lsKey) => {
    const entries = JSON.stringify(Object.fromEntries([...map.entries()]));
    localStorage.setItem(lsKey, entries);
}

export function truncateDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${day}.${month}`;
}

export function validateData(name, amount) {
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

export function convertDatestring(dateString) {
    const currentYear = new Date().getFullYear();
    const [d, monthIndex] = dateString.split('.');
    const date = ('0' + d).slice(-2);
    const month = ('0' + (months.indexOf(monthIndex) + 1)).slice(-2);
    return (`${currentYear}-${month}-${date}`);
}

export function getFormData(e) {
    const formData = new FormData(e.target);
    const data = (Object.fromEntries(formData));
    return data;
}
export function dateToString(date) {
    const d = date.getDate();
    const yyyy = date.getFullYear();
    const monthIndex = months[date.getMonth() + 1];
    const dd = ('0' + d).slice(-2);
    const mm = ('0' + months.indexOf(monthIndex)).slice(-2);
    return (`${yyyy}-${mm}-${dd}`);
}

export function El(typeStr, attributesObj, ...content) {
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

export function createTableRow(tabledataArray, indicesArray) {
    const tr = document.createElement('tr');
   Object.values(tabledataArray) .forEach((element, index) => {
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