const mongoose = require('mongoose');

const userShema = mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    
}, { timestamps: true })

const User = new mongoose.model('User', userShema);

module.exports = User;
