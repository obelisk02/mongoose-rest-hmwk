const mongoose = require('mongoose');

const CourseModel = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        length: 3,
        default: '000'
    },
    hoursPerWeek: {
        type: Number,
        min: 3,
        max: 10,
        default: 3
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Teacher'
    },
    active: {
        type: Boolean,
        default: true
    },
    students: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }]
});

mongoose.model('Course', CourseModel);