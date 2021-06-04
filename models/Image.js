const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    type: { type: String, required: true },
    data: Buffer,
    exercise: { type: Types.ObjectId, ref: 'Exercise' }
});

module.exports = model('Image', schema);
