const { Schema, model, Types } = require('mongoose');
const TYPES_EVENTS = require('../constants/constants');

const schema = new Schema({

    type: {
        type: String,
        enum: TYPES_EVENTS,
        required: true,
        default: 'goal'
    },
    minute: {
        type: Number,
        required: true,
    },
    owner: {
        type: Types.ObjectId,
        ref: 'Player',
        required: true
    },
    assistant: {
        type: Types.ObjectId,
        ref: 'Player',
    },
    game: {
        type: Types.ObjectId,
        ref: 'Game',
        required: true,
    },
    tournament: {
        type: Types.ObjectId,
        ref: 'Tournament',
        required: true,
    },
    img: {
        type: String,
        default: ''
    }
});

module.exports = model('Event', schema);
