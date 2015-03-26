var Schema = require('mongoose').Schema

var clientSchema = new Schema({
  nombre 	: { type: String },
  direccion	: { type: String },
  telefono	: { type: Number },
  email		: {type:String}
});

module.exports = clientSchema;