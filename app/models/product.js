'use strict';

var  Mongo  = require('mongodb');

function Product(o){
  this.name = o.name;
  this.photo = o.photo;
  this.price = parseFloat(o.price);
  this.count = o.count * 1;
  this.t = this.price * this.count;
  this.tax = 7.5;
  this.total =+ this.t * this.tax;
}

Object.defineProperty(Product, 'collection', {
  get: function(){return global.mongodb.collection('products');}
});

Product.all = function(cb){
  Product.collection.find().toArray(cb);
};

Product.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Product.collection.findOne({_id:_id},cb);
};

module.exports = Product;

