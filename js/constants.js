export const bodyEmptyArr = (n)=>[
    new Array(n).fill(0),//utils
    new Array(n).fill(0),//groc
    new Array(n).fill(0),//ent
    new Array(n).fill(0),//trans
    new Array(n).fill(0),//other
    new Array(n).fill(0),//total
];
export const footerEmptyArr = (n)=> [...Array(3)].map(e => Array(n).fill(0));