var compression = require('compression')
var express = require("express");
var storage = require('node-persist');
var bodyParser = require('body-parser');
var uuid = require('node-uuid');

var app = express();
app.use(compression());
app.use(bodyParser.json());

storage.initSync({
	dir:'../../../../data',
	stringify: JSON.stringify,
	parse: JSON.parse,
	encoding: 'utf8',
	logging: false,  // can also be custom logging function 
	continuous: true,
	interval: false,
	ttl: false, 
});

var _cars=storage.getItem('Cars')||[];

/* serves main page */
app.get("/", function(req, res) {
	res.sendFile(__dirname+'/index.html');
});

app.post("/addCar", function(req, res) { 
	console.log(req.body);
	_cars.push({'index':uuid.v1(),'data':req.body});
	storage.setItem('Cars',_cars);
	console.log(_cars);
	res.send(_cars);
});

app.post("/deleteCar", function(req, res) { 
	var _index=req.body.index;
	var _newCars=[];
	for (var i = _cars.length - 1; i >= 0; i--) {
		if (_cars[i].index!=_index) {
			_newCars.push(_cars[i]);
		}
	};
	_cars=_newCars;
	storage.setItem('Cars',_cars);
	res.send(_cars);
});

app.get("/cars", function(req, res) { 
res.send(_cars);
});

/* serves all the static files */
app.get(/^(.+)$/, function(req, res){ 
 console.log('static file request : ' + req.params);
 res.sendFile( __dirname + req.params[0]); 
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
console.log("Listening on " + port);
});