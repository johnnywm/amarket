const mongoose = require('mongoose');
var moment = require('moment');
const Schema = mongoose.Schema;
var now = moment();
const OrderSchema = new Schema({
    idCliente:{
        type: String,
        trim: true,  
        required: false
    },


    nombreCliente: {
        type: String,
        trim: true,  
        required: true
       },
              
       telefonoCliente: {
        type: Number,
        trim: true,  
        required: false,
       },
       solicitudNumero: {
        type: Number,
        trim: true,  
        required: true,
       },
       correoCliente: {
        type: String,
        trim: true,  
        required: true,
       },

       Precio: {
        type: Number,
        trim: true,  
        required: true,
       },
   
       Modelo: {
        type: String,
        trim: true,  
        required: true
       },
       Repuesto: {
        type: String,
        trim: true,  
        required: true
       },
       Color: {
        type: String,
        trim: true,  
        required: false
       },
 
   Estatus:{          
                   type: String,
                    trim: true,  
                    required: false,
                
   },

   Imagen:[],
   timestamp: {
    type: String, 
    default: () => moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
}


   });

   module.exports = mongoose.model('SolicitudRepuesto', OrderSchema);