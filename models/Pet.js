const mongoose = require('mongoose');

const PetModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    birth_date: {
        type: Date,
        required: false
    },
    weight: {
        type: Number,
        required: true
    },
    specie: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'alive',
        enum: ['deceased', 'alive']
    },
    owner: {
        ref: ''
    }
});

mongoose.model('Pet', PetModel);