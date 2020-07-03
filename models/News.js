const { Schema, model, Types } = require('mongoose');

const schema = new Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },
    textPreview: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now
    },
    tags: [{
        type: Types.ObjectId,
        ref: 'Tag',
        default: []
    }]
});

module.exports = model('News', schema);
