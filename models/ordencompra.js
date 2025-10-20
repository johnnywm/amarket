const mongoose = require('mongoose');
var moment = require('moment-timezone');
const Schema = mongoose.Schema;

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
       carritoNumero: {
        type: Number,
        trim: true,  
        required: true,
       },
       correoCliente: {
        type: String,
        trim: true,  
        required: true,
       },

       direccionCliente: {
        type: String,
        trim: true,  
        required: false,
       },
       cedulaCliente: {
        type: Number,
        trim: true,  
        required: false,
       },
       ciudadCliente: {
        type: String,
        trim: true,  
        required: false,
       },
       bancoCliente: {
        type: String,
        trim: true,  
        required: false,
       },
       formadePago: {
        type: String,
        trim: true,  
        required: true,
       },
       valorFinal: {
        type: Number,
        trim: true,  
        required: true,
       },
       envio: {
        status:{
            type: Boolean,
            trim: true,  
            required: false,
           },
        tipo: {
            type: String,
            trim: true,  
            required: false,
           },
           valor: {
            type: Number,
            trim: true,  
            required: false,
           }
   
   },   
   estatus:{
                pagado: {
                    type: String,
                    trim: true,  
                    required: false,
                },
                realizado: {
                    type: String,
                    trim: true,  
                    required: false,
                }
   },
   timestamp: {
    type: String, 
    default: () => moment().tz("America/Atikokan").format("dddd, MMMM Do YYYY, h:mm:ss a")
},
  carrito: [], 

  valoraPagar: {
    type: Number,
    trim: true,  
    required: false,
    default: 'default'
   },
   coinsAntes: {
    type: Number,
    trim: true,  
    required: false,
    default: 'default'
   }
   ,
   coinsDespues: {
    type: Number,
    trim: true,  
    required: false,
    default: 'default'
   }
   ,
   coinsUsadas: {
    type: Number,
    trim: true,  
    required: false,
    default: 'default'
   }

   });

   module.exports = mongoose.model('Ordencompra', OrderSchema);