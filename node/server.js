/** dependencies **/
var express    = require('express'),
    bodyParser = require('body-parser'),
    app        = express(),
    mongoose   = require('mongoose');

/** instances **/
var db = mongoose.connection;
var Client;
db.on('error', console.error);
db.once('open', function() {
  // Mongoose Schema definition
  var Schema = mongoose.Schema;
  var clientSchema = new Schema({
    }, {collection: 'clients'});

  // Mongoose Model definition
  Client = mongoose.model('client', clientSchema);
});
//mongodb://localhost/carfix
mongoose.connect('mongodb://test:test@ds055689.mongolab.com:55689/carfix', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database ');
  }
});

app.get('/clients', function (req, res, next) {
          Client.find({}, function (err, data) {
            res.json(data);
          });
});

app.listen(3000, function() {
  console.log("Node server running on port: 3000");
});
