export const brandFilter = (arr, brand) => {
    if(!brand) return arr;
    if(brand.length == 0) return arr;

let result = arr.filter(product => brand.includes(product.Marca.toUpperCase()));
  
return result
  
};