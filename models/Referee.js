const { Schema, model } = require('mongoose');

const schema = new Schema({

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
    img: {
        type: String,
        default: ''
    }
});

module.exports = model('Referee', schema);
