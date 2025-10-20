export const categoryFilter = (arr, category) => {
    if(!category) return arr;

    return arr.filter(product =>  {
        console.log(product);
        return(product.Categoria.nombreCat.trim().toUpperCase() == category)});
  
};