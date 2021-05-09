const { Schema, model, Types } = require('mongoose');

const schema = new Schema({

    type: {
        type: Number,
        required: true,
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
    }
});

module.exports = model('Event', schema);
