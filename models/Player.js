
const { Schema, model } = require('mongoose');

const schema = new Schema({
    birthday: {
        type: Date,
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
    img: {
        type: String,
        default: ''
    },
    number: {
        type: Number,
        default: 0
    },
    selected: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Player', schema);
