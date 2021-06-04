const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: { type: String, required: true },
    descr: { type: String, required: true },
    minCountReps: { type: Number, required: true },
    minWeight: { type: Number, required: false },
    refs: [{ type: Types.ObjectId, ref: 'Refs' }],
    strategies: [{ type: Types.ObjectId, ref: 'Strategy' }]
});

module.exports = model('Exercise', schema);
