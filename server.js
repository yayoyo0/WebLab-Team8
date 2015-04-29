var cc          = require('config-multipaas'),
    restify     = require('restify'),
    fs          = require('fs'),
    mongojs 	= require('mongojs')


var config      = cc(),
    app         = restify.createServer()

app.use(restify.queryParser())
app.use(restify.CORS())
app.use(restify.fullResponse())
app.use(restify.bodyParser())

var db = mongojs('mongodb://test:test@ds055689.mongolab.com:55689/carfix', ['clients']);

// Routes
app.get('/status', function (req, res, next)
{
  res.send("{status: 'ok'}");
});

app.get("/clients", function (req, res, next) {
    db.clients.find(function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(data));
    });
    return next();
});

app.get('/clients/:name', function (req, res, next) {
    db.clients.findOne({
        name: req.params.name
    }, function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(data));
    });
    return next();
});

app.post('/clients', function (req, res, next) {
	var client = req.params;
    db.clients.save(client,
        function (err, data) {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(data));
        });
    return next();
});

app.del('/clients/:name', function (req, res, next) {
    db.clients.remove({
        name: req.params.name
    }, function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(true));
    });
    return next();
});


app.put('/clients/:name', function (req, res, next) {
    db.clients.findOne({
        name: req.params.name
    }, function (err, data) { 
        var client = {};
        for (var n in data) {
            client[n] = data[n];
        }
        for (var n in req.params) {
            client[n] = req.params[n];
        }
        db.clients.update({
            name: req.params.name
        }, client, {
            multi: false
        }, function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
        });
    });
    return next();
})



app.put('/clients/:name', function (req, res, next) {
  var client = clients[req.params.name];
  var changes = req.params;
  delete changes.name;
  for(var x in changes) {
    client[x] = changes[x];
  }
  res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
  res.end(JSON.stringify(client));
  return next();
});

app.get('/', function (req, res, next)
{
  var data = fs.readFileSync(__dirname + '/index.html');
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.end(data.toString().replace(/host:port/g, req.header('Host')));
});

app.get('/index2', function (req, res, next)
{
  var data = fs.readFileSync(__dirname + '/index2.html');
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.end(data.toString().replace(/host:port/g, req.header('Host')));
});

app.get('/client', function (req, res, next)
{
  var data = fs.readFileSync(__dirname + '/clients.html');
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.end(data.toString().replace(/host:port/g, req.header('Host')));
});

app.get('/cars', function (req, res, next)
{
  var data = fs.readFileSync(__dirname + '/cars.html');
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.end(data.toString().replace(/host:port/g, req.header('Host')));
});

app.get('/about', function (req, res, next)
{
  var data = fs.readFileSync(__dirname + '/about.html');
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.end(data.toString().replace(/host:port/g, req.header('Host')));
});

app.get('/contact', function (req, res, next)
{
  var data = fs.readFileSync(__dirname + '/contact.html');
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.end(data.toString().replace(/host:port/g, req.header('Host')));
});

app.get(/\/(css|js|img)\/?.*/, restify.serveStatic({directory: './static/'}));

app.listen(config.get('PORT'), config.get('IP'), function () {
  console.log( "Listening on " + config.get('IP') + ", port " + config.get('PORT') )
});
