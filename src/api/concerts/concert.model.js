const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    img: { type: String, unique: true, required: true },
    name: { type: String, unique: true, required: true },
    location: { type: String, unique: true, required: true },
    date: { type: String, unique: true, required: true },
    price: { type: Number, required: true },
    artist: [{ type: Schema.Types.ObjectId, ref: "artist" }],
    visitor: [{ type: Schema.Types.ObjectId, ref: "user" }],
    comment: [{ type: Schema.Types.ObjectId, ref: "user" }],
    ticket: { type: String, unique: true, required: true },

},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('concert', schema);