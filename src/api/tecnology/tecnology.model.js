const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    name: { type: String, unique: true, required: true },
    imagen: { type: String, unique: true, required: true },
    tools: [{ type: Schema.Types.ObjectId, ref: "tool" }],
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('tecnology', schema);