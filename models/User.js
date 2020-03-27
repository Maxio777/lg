const ROLES = require('../constants/constants');

const { Schema, model } = require('mongoose');

const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    data: {
        birthday: {
            type: Date,
            default: Date.now
        },
        lastName: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        middleName: {
            type: String
        },
        roles: {
            type: String,
            enum: ROLES,
            default: ROLES[0]
        },
        img: {
            type: String,
            default: ''
        }
    }
});

module.exports = model('User', schema);
