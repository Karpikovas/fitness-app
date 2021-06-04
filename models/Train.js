const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    dateStart: { type: Date, required: true },
    durationMin: { type: Number, default: 0 },
    user: { type: Types.ObjectId, ref: 'User', required: true },
    exercises: [{
        exercise: { type: Types.ObjectId, ref: 'Exercise' },
        weight: { type: Number, required: false },
        countReps: { type: Number, required: true }
    }]
});

module.exports = model('Train', schema);
