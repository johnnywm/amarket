

export const orderByFilter = (arr, type ) => {
    if(!type) return arr;
    console.log('orderbYmethod', type);
    if(type === 'asc') {
        return arr.slice().sort((el1, el2) => el1.Precio_Venta - el2.Precio_Venta);
    } else {
        return arr.slice().sort((el1, el2) => el2.Precio_Venta - el1.Precio_Venta);
    }
};