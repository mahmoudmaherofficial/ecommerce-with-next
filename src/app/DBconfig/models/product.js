const mongoose = require('mongoose')
const Schema = mongoose.Schema
const models = mongoose.models

// define the schema
const productSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  // image: String
})

// Create a model based on schema
const ProductModel = models.Product || mongoose.model('Product', productSchema)

//export the model
module.exports = ProductModel