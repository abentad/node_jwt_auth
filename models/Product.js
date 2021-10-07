const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    posterId: {
        type: String,
        required: [true, 'poster id required']
    },
    posterName:{
        type: String,
        required: [true, 'poster name required'],
        lowercase: true
    },
    posterPhoneNumber:{
        type: String,
        required: [true, 'please provide a phone number']
    },
    name: {
        type: String,
        required: [true, 'Please enter product name.'],
        lowercase: true
    },
    description: {
        type: String,
        required: [true, 'Pleasae enter product description'],
        lowercase: true
    },
    datePosted: {
        type: Date,
        required: true
    },
    productImages: [
        { type: String }
    ],
    
}) 

const Product = mongoose.model('product', productSchema); 

module.exports = Product; 