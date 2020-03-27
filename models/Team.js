const { Schema, model, Types } = require('mongoose');

const schema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    players: [{
        type: Types.ObjectId,
        ref: 'Player',
    }],
    managers: [{
        type: Types.ObjectId,
        ref: 'Manager',
    }],
    tournaments: [{
        type: Types.ObjectId,
        ref: 'Tournaments',
    }],
    img: {
        type: String,
        default: ''
    },
    selected: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Team', schema);
