var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var clienteSchema = new Schema({
  nombre:{ type: String },
  direccion:{ type: String },
  telefono:{ type: Number },
  email:{type:String}
});

module.exports = mongoose.model('clientes', clienteSchema);