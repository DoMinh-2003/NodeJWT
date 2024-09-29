const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { role } = require('../enums/role');

const authSchema = new schema({
    fullName: {
        type: String,
        required: [true, 'FullName cannot be blank'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email cannot be blank'],
        unique: true,
        match: [/^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/, 'Email is not valid']
    },
    username: {
        type: String,
        required: [true, 'Username cannot be blank'],
        unique: true,
        minlength: [5, 'Username must be at least 5 characters long']
    },
    password: {
        type: String,
        required: [true, 'Password cannot be blank'],
        minlength: [5, 'Password must be at least 5 characters long.']
    },
    role: {
        type: String,
        enum: Object.values(role), 
        default: role.STUDENT, 
        required: true
    }
    },{timestamps: true})
    
    const auth = mongoose.model('auth',authSchema);
    module.exports = auth;