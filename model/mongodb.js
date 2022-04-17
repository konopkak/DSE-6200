const mongoose = require('mongoose');
 
mongoose.connect('mongodb+srv://karolinakonopka:2611@cluster0.42axa.mongodb.net/car_listings?retryWrites=true&w=majority', {useNewUrlParser: true}, (err) => {
if (!err) {
console.log('Successfully Established Connection with MongoDB')
}
else {
console.log('Failed to Establish Connection with MongoDB with Error: '+ err)
}
});
 
//Connecting Node and MongoDB
require('./sale.model');

