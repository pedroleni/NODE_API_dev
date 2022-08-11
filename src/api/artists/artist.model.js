const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    img: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    genero: { type: String, required: true },
    viewsMonth: [{ type: Schema.Types.ObjectId, ref: "user" }]
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('artist', schema);