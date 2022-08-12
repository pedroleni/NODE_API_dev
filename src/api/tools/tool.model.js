const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    name: { type: String, unique: true, required: true },
    imagen: { type: String, unique: true, required: true },
    descripcion: { type: String, unique: true },
    

},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('tool', schema);