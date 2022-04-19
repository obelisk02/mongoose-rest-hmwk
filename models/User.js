const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserModel = new mongoose.Schema({
    first_name: {
        type: String,
        trim: true,
        required: true
    },
    last_name: {
        type: String,
        required: true,
        maxlength: 10
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    hash_password: {
        type: String
    },
    image: {
        type: String,
        default: 'https://simulacionymedicina.es/wp-content/uploads/2015/11/default-avatar-300x300-1.jpg'
    }
});

UserModel.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
}

UserModel.methods.toJson = function() {
    return {
        full_name: this.full_name,
        email: this.email,
        image: this.image
    };
}

UserModel.virtual('full_name').get(function() {
    return this.first_name+ ' ' + this.last_name;
});

mongoose.model('User', UserModel);