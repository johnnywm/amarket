export const Filter = (arr, valor) => {
    if(!valor) return arr;
    if(valor === "") return arr;
const interger = parseInt(valor)
    return  arr.filter(arti => arti.Eqid === interger);
  
};
export const Searcher = (arr, payload) => {
    if(!payload) return arr;
const uppercase= payload.toUpperCase() 

let result = arr.filter(product => product.Titulo.includes(uppercase));

    return  result
  
};
