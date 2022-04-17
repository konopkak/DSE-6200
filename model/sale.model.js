const mongoose = require('mongoose');


//Attributes of the Sales object
var saleSchema = new mongoose.Schema({
	Manufacturer: {
	type: String,
	required: 'This field is required!'
	},
	Model: {
	type: String
	},
	Vehicle_Type: {
	type: String
	},
	Resale_Value: {
	type: String
	},
	Listing_Price: {
	type: String
	}
	});


module.exports = mongoose.model('Sale', saleSchema);



// Create Schema for Individual Companies

const Sale = mongoose.model('Sale');

const GM_Sales = Sale.aggregate([
                { $match: {Manufacturer: {$in:["Chevrolet","Cadillac"]}}}]).exec(function ( e, d ) {console.log( d )});
                
const Stel_Sales = Sale.aggregate([
                { $match: {Manufacturer: {$in:["Chrysler","Dodge", "Jeep"]}}}]).exec(function ( e, d ) {console.log( d )});
    
const Ford_Sales = Sale.aggregate([
				{ $match: {Manufacturer: {$in:["Ford","Lincoln"]}}}]).exec(function ( e, d ) {console.log( d )});

const Other_Sales = Sale.aggregate([
                { $match: {Manufacturer: {$not: {$in:["Chrysler", "Dodge", "Jeep", "Chevrolet", "Cadillac", "Ford", "Lincoln"]}}}}
                ]).exec(function ( e, d ) {console.log( d )});
                
                
var GM_Schema= new mongoose.Schema({
     Manufacturer: String,
    Model : String,
    Vehicle_Type : String,
    Resale_Value : String,
    Listing_Price : String,
 },
 );


module.exports = mongoose.model('GMSale', GM_Schema);

