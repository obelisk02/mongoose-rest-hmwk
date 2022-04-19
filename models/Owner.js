const mongoose = require('mongoose');

const OwnerModel = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    pets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet"
    }],
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive']
    }
});

mongoose.model('Owner', OwnerModel);