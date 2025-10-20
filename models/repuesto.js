const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RepuestoSchema = new Schema({
    jwID: {
        type: Number,
        trim: true,  
        required: true,
       },
    Grupo: {
     type: String,
     trim: true,  
     required: true,
    },
    Marca: {
     type: String,
     trim: true,
     required: true
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
     Calidad: {
        type: String,
        trim: true,
        required: true
       },
       Color: {
        type: String,
        trim: true,
        required: false
       },
       Precio: {
        type: Number,
        trim: true,
        required: true
       },
       Descripcion: {
        type: String,
        required: true
       },
       Garantia: {
        type: String,
        required: true
       },
       Tiempo: {
        type: String,
        required: true
       },
       Imagen: []
      
 

   });

   module.exports = mongoose.model('Repuesto', RepuestoSchema);