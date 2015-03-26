var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var clienteSchema = new Schema({
  nombre:{ type: String },
  direccion:{ type: String },
  telefono:{ type: Number },
  email:{type:String}
});

module.exports = mongoose.model('clientes', clienteSchema);


var Schema = require('mongoose').Schema
 
var producto_schema = new Schema({
  nombre        :   String,
  descripcion   :   String,
  precio        :   String
})
 
module.exports = producto_schema