//Import the dependencies
const express = require('express');
const mongoose = require('mongoose');
//Creating a Router
var router = express.Router();
//LinkdoMapReduce
const Sale = mongoose.model('Sale');

const GM_Sales = Sale.aggregate([
                { $match: {Manufacturer: {$in:["Chevrolet","Cadillac"]}}}]).exec(function ( e, d ) {console.log( d )});
                
const GM_Schema= new Schema({
    _id: String,
    Manufacturer: String,
    Model : String,
    Vehicle_Type : String,
    Resale_Value : String,
    Listing_Price : String,
},
{
  collection: 'GM_Sales',
  timestamps: { createdAt: true, updatedAt: true },
});


module.exports = mongoose.model('Sale', saleSchema);

    
const Stel_Sales = Sale.aggregate([
                { $match: {Manufacturer: {$in:["Chrysler","Dodge", "Jeep"]}}}]).exec(function ( e, d ) {console.log( d )});
    
const Ford_Sales = Sale.aggregate([
				{ $match: {Manufacturer: {$in:["Ford","Lincoln"]}}}]).exec(function ( e, d ) {console.log( d )});

const Other_Sales = Sale.aggregate([
                { $match: {Manufacturer: {$not: {$in:["Chrysler", "Dodge", "Jeep", "Chevrolet", "Cadillac", "Ford", "Lincoln"]}}}}
                ]).exec(function ( e, d ) {console.log( d )});
    
