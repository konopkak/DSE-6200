//Import the dependencies
const express = require('express');
const mongoose = require('mongoose');
//Creating a Router
var router = express.Router();
//LinkdoMapReduce
const Sale = mongoose.model('Sale');
const GMSale = mongoose.model('GMSale');


//Router Controller for READ request
router.get('/',(req, res) => {
  console.log('router.get:');
  res.render("sales/saleAddEdit", {
    viewTitle: "Insert a New Sale"
  });
});

//Router Controller for UPDATE request
router.post('/', (req,res) => {
  console.log('router.post:');
  if (req.body.sales == "add")
  {
    insertIntoMongoDB(req, res);
  }
  else
    updateIntoMongoDB(req, res);
});

//Creating function to insert data into MongoDB
function insertIntoMongoDB(req,res) {
  console.log('insertIntoMongoDB:');
  var sales = new Sale();
  sales.manufacturer = req.body.manufacturer;
  sales.model = req.body.model;
  sales.salesInThds = req.body.salesInThds;
  sales.vehicleType = req.body.vehicleType;
  sales.priceInThds = req.body.priceInThds;
  sales.save((err, doc) => {
    if (!err)
    {
      console.log('res.redirect sales/list: ');
      res.redirect('sales/list');
    }
    else
    console.log('Error during record insertion : ' + err);
  });
}

//Creating a function to update data in MongoDB
function updateIntoMongoDB(req, res) {
  console.log('updateIntoMongoDB:');
  Sale.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
    if (!err) { res.redirect('sales/list'); }
    else {
      if (err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        res.render("sales/saleAddEdit", {
          //Retaining value to be displayed in the child view
          viewTitle: 'Update Sale Details',
          employee: req.body
        });
      }
      else
      console.log('Error during updating the record: ' + err);
    }
  });
}

//Router to retrieve the complete list of sales
router.get('/list', (req,res) =>{
  //   getManufacturerBasedOnSales();
  Sale.find((err, docs) => {
    if(!err){
      console.log('res.redirect sales/list: ');
      res.render("sales/list", {list: docs});
    }
    else {
      console.log('Failed to retrieve the Sale List: '+ err);
    }
  });
});

//Router to retrieve the complete list of sales
router.get('/GMlist', (req,res) =>{
  //   getManufacturerBasedOnSales();
  Sale.find((err, docs) => {
    if(!err){
      console.log('res.redirect sales/GMlist: ');
      res.render("sales/chevlist", {list: docs});
    }
    else {
      console.log('Failed to retrieve the Sale List: '+ err);
    }
  });
});


//Router to retrieve the complete list of sales
router.get('/mapReduce', (req,res) =>{
  //   getManufacturerBasedOnSales();
  console.log('Inside Calculate::');
  getManufacturerBasedOnSales(req,res);
});

//Creating a function to implement input validations
function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case 'courseName':
      body['courseNameError'] = err.errors[field].message;
      break;
      default:
      break;
    }
  }
}

//Router to update a sales using it's ID
router.get('/:id', (req, res) => {
  Sale.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("sales/saleAddEdit", {
        viewTitle: "Update Sale Details",
        sales: doc
      });
    }
  });
});

//Router Controller for DELETE request
router.get('/delete/:id', (req, res) => {
  Sale.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect('/sales/list');
    }
    else { console.log('Failed to Delete Sale Details: ' + err); }
  });
});

//Router Controller for mapReduce
var carSale = require('../model/sale.model');
function getManufacturerBasedOnSales(req, res){
  var o = {},
  self = this;

  o.map = function () {
    emit(this.manufacturer,this.salesInThds)
  };
  o.reduce = function (k, values) {
    return Array.sum(values);
  };
  o.filter = function () {
    return this.manufacturer == 'Audi';
  };

  carSale.mapReduce(o, function (err, results) {
    if(err) throw err;
    res.render("sales/mapReduce", {mapReduce:results});
    console.log(results)
    //return results;

  });
}
module.exports = router;
