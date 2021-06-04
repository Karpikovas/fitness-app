const {Schema, model, Types} = require('mongoose');
// const mongoose = require('mongoose');
//
// const schema = new Schema({
//     bodyType: { type: Types.ObjectId, ref: 'Refs' },
//     aim: { type: Types.ObjectId, ref: 'Refs' },
//     weightStrategy: { type: Number },
//     countRepsStrategy: { type: Number },
// });
//
// const Strategy = module.exports = mongoose.model('Strategy', schema, 'Strategy');

const mongoose = require('mongoose');
const config = require('config');

mongoose.connect(config.get('mongoUri'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const StrategySchema = new mongoose.Schema({
    bodyType: { type: Types.ObjectId, ref: 'Refs' },
    aim: { type: Types.ObjectId, ref: 'Refs' },
    weightStrategy: { type: Number },
    countRepsStrategy: { type: Number },
});
const Strategy = mongoose.model('Strategy', StrategySchema, 'strategy');

module.exports = Strategy;
