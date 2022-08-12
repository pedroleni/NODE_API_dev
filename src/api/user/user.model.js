const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcryp = require('bcrypt');
const {validationPassword, setError} = require ('../../helpers/utils');



const schema = new Schema({
    email: { type: String, unique: true, required: true },
    username: { type: String, required: true, unique: true },
    password:  {type: String, required: true }
},
    {
        timestamps: true
    }
);

schema.pre('save', function (next){
    if (!validationPassword(this.password)) return next (setError('400','Contraseña Invalida '))
    this.password =bcryp.hashSync(this.password, 16);
    next();



});


module.exports = mongoose.model('user', schema);