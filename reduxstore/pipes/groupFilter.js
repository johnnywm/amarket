export const groupFilter = (arr, group) => {
    console.log(group)
    let groupUper = group.toUpperCase()
    if(!group) return arr;

    return arr.filter(product => product.Grupo.toUpperCase() == groupUper);
  
};