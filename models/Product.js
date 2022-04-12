const mongoose = require('mongoose');

const ProductModel = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 100,
        required: true
    },
    description: {
        type: String, 
        maxlength: 200,
        required: true
    },
    image: {
        type: String
    },
    brand: {
        type: String,
        required: true
    }
});

mongoose.model('Product', ProductModel);