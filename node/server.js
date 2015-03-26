var express  = require("express"),
    app      = express(),
    http     = require("http"),
    server   = http.createServer(app),
    mongoose = require('mongoose'); 

var db = mongoose.connection;
var Client;
db.on('error', console.error);
db.once('open', function() {
  // Mongoose Schema definition
  var Schema = mongoose.Schema;
  var clientSchema = new Schema({
    name    :  { type: String },
    address :  { type: String },
    phone   :  { type: Number },
    email   :  { type: String },
    coches  :  { type: String }
    }, {collection: 'clientes'});

  // Mongoose Model definition
  Client = mongoose.model('client', clientSchema);
});

mongoose.connect('mongodb://localhost/carfix', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database ' + res);
  }
});

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.configure(function () {
  app.use(allowCrossDomain);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.get('/', function(req, res,next) {
  Client.find({}, function (err, data) {
    console.log(data);
        res.json(data);
    });
});


server.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});