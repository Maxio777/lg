const { Schema, model, Types } = require('mongoose');

const schema = new Schema({

    tournament: {
        type: Types.ObjectId,
        ref: 'Tournament',
    },
    home: {
        type: Types.ObjectId,
        ref: 'Team',
    },
    guest: {
        type: Types.ObjectId,
        ref: 'Team',
    },
    tour: {
        type: String,
    },
    date: {
        type: String,
        default: '',
    },
    homePlayers: [{
        type: Types.ObjectId,
        ref: 'Player',
        default: []
    }],
    guestPlayers: [{
        type: Types.ObjectId,
        ref: 'Player',
        default: []
    }],
    homeManagers: [{
        type: Types.ObjectId,
        ref: 'Manager',
        default: []
    }],
    guestManagers: [{
        type: Types.ObjectId,
        ref: 'Manager',
        default: []
    }],
    referees: [{
        type: Types.ObjectId,
        ref: 'Referee',
        default: []
    }],
    events: [{
        type: Types.ObjectId,
        ref: 'Event',
        default: []
    }],
    guestGoal: {
        type: Number,
        default: null
    },
    homeGoal: {
        type: Number,
        default: null
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Game', schema);
