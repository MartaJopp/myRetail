var express = require('express'); // use express
var app = express();
var port = process.env.PORT || 5000; // deployment/port
var bodyParser = require('body-parser'); // require body-parser
var products = require('./routes/product.router.js'); // accesses router


app.use(bodyParser.json());
// static files
app.use(express.static('server/public'));
//use products route
app.use('/products', products);

var mongoose = require('mongoose'); //require mongoose

// Mongo Connection //
var mongoURI = '';
// process.env.MONGODB_URI will only be defined if
// deployed
if (process.env.MONGODB_URI != undefined) {
    // use the string value of the environment variable
    mongoURI = process.env.MONGODB_URI;
} else {
    // use the local database server
    mongoURI = 'mongodb://localhost:27017/product';
}

//conect to mongoose
mongoose.connect(mongoURI, {
    useMongoClient: true
});

//error on connection
mongoose.connection.on('error', function (err) {
    if (err) {
        console.log("MONGO ERROR: ", err);
    }
    res.sendStatus(500);
});

//or successful connection
mongoose.connection.on('open', function () {
    console.log("Connected to Mongo!");
});

//spins up server - lets us know server is running
app.listen(port, function () {
    console.log('Listening on port', port)
})

module.exports = app;
