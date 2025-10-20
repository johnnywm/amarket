export const Convertidor = (tiempo) =>{
  
console.log(tiempo)
    let now = new Date(parseInt(tiempo))
    console.log(now)
    let año = now.getFullYear()
    let dia = now.getDate()
    let mes = now.getMonth()
    
    let fecha =  `${addCero(dia)} / ${addCero(mes)} / ${año} ||` 
    let hora = `${now.getHours()} : ${now.getMinutes()} ` 
    let string = JSON.stringify(fecha).replace(/['"]+/g, '')
    let string2 = JSON.stringify(hora).replace(/['"]+/g, '')

    return(string + " "+string2)
}

const addCero=(n)=>{
    if (n<10){
      return ("0"+n)
    }else{
      return n
    }
  }