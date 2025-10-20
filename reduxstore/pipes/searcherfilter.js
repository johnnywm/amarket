export const searcher = (arr, payload) => {
    if(!payload) return arr;
const uppercase= payload.toUpperCase() 
    return arr.filter(product => product.Titulo.toUpperCase().includes(uppercase));
  
};