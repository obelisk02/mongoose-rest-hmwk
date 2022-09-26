const mongoose = require('mongoose');

const TeacherModel = new mongoose.Schema({
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
    },
    courses: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ]
});

TeacherModel.virtual('full_name').get(() =>  this.first_name +' '+this.last_name);

mongoose.model('Teacher', TeacherModel);