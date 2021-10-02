const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name.']
    },
    description: {
        type: String,
        required: [true, 'Pleasae enter product description']
    },
    datePosted: {
        type: Date,
        required: true
    },
    productImages: [
        { type: String }
    ]
}) 

const Product = mongoose.model('product', productSchema); 

module.exports = Product; 