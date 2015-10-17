var express = require('express');

  // Retrieve
var mongoose = require('mongoose');
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)  
var Data = [];
// Connect to the db
mongoose.connect("mongodb://localhost:27017/test");

var app = express();
require('./modules/route')(app);
// require('./modules/controllers/showPost')(app);


 app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

app.use('/node_modules', express.static(__dirname + '/node_modules')); //need this path to get angular.js
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(express.static('public'));



	// app.get('/api/movies', function(request, response){
	// 	Movie.find(function(err, blogs){
	// 		if(err){
	// 			response.send(err);
	// 		}
	// 		// data = blogs;
	// 		response.json(blogs);
	// 	});
	// });

	//     // create todo and send back all todos after creation
 //    app.post('/api/movies', function(req, res) {

 //        // create a todo, information comes from AJAX request from Angular
 //        Movie.create({
 //            text : req.body.text,
 //            done : false
 //        }, function(err, blogs) {
 //            if (err)
 //                res.send(err);

 //            // get and return all the todos after you create another
 //            Movie.find(function(err, blogs) {
 //                if (err)
 //                    res.send(err)
 //                res.json(blogs);
 //            });
 //        });

 //    });


app.get('/', function(request, response){
	console.log(response);	
  response.sendFile(__dirname + '/views/index.html');
});

// //this will solve uploading to heroku code10 error
app.listen((process.env.PORT || 5000), function(){
  console.log('listening on *:5000');
});