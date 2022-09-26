const mongoose = require('mongoose');

const StudentModel = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        min: 3
    },
    last_name: {
        type: String,
        required: true
    },
    birth_date: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        unique: true,
    }
});

mongoose.model('Student', StudentModel);