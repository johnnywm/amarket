export const Filter = (arr, valor) => {
    console.log(valor)
    if(!valor) return arr;
    if(valor === "") return arr;

    return  arr.filter(arti => arti.titulo.toUpperCase().includes(valor.toUpperCase()));
  
};