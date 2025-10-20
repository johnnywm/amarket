export const Filter = (arr, valor) => {
    if(!valor) return arr;
    if(valor === "") return arr;

    return  arr.filter(arti => arti.Titulo.toUpperCase().includes(valor.toUpperCase()));
  
};
export const SearcherUpdate = (arr, payload) => {
    
    if(!payload) return arr;
const lowerCase= payload.toLowerCase() 



let miarrsplited =lowerCase.split(" ")



let resulttag = arr

for(let i = 0;i<miarrsplited.length;i++){
  resulttag=   resulttag.filter(product => product.Titulo.toLowerCase().includes(miarrsplited[i]));
}

//let result = arr.filter(product => product.Titulo.replace("  "," ").trim().toLowerCase().includes(lowerCase));

    return  resulttag
  
};