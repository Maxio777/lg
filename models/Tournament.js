const { Schema, model } = require('mongoose');
const FORMATS_TOURNAMENTS = require('../constants/constants').FORMATS_TOURNAMENTS;

const schema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    dateStart: {
        type: Date,
        default: Date.now
    },
    dateEnd: {
        type: Date,
        default: Date.now
    },
    completed: {
        type: Boolean,
        default: false
    },
    format: {
        type: String,
        enum: FORMATS_TOURNAMENTS,
        default: '11x11'
    },
    current: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Tournament', schema);
