require('./model/mongodb');
 
//Import the necessary packages
const express = require('express');
var app = express();
const path = require('path');
const bodyparser = require('body-parser');

var Handlebars = require('handlebars')
var exphb = require('express-handlebars');
var {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')


const saleController = require('./controller/saleController');


app.use(bodyparser.urlencoded({
extended: true
}));
 
//Create a welcome message and direct them to the main page
app.get('/', (req, res) => {
  res.send(' <h2 align="center" style="font-family: Malgun Gothic; color: midnightblue "><br>Car Listings Data</h2><br><br> <b> <a align="center" href="/list">View Current Listings</a> <br><br><a href="/sales">Insert a New Sale</a><br></b>');
});

app.use(bodyparser.json());

//Configuring Express middleware for the handlebars

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphb.engine({ extname: 'hbs', defaultLayout: 'mainLayout', layoutDir: __dirname + 'views/layouts/',handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'hbs');
 
//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}..`));
 
//Set the Controller path which will be responding the user actions
app.use('/sales', saleController);