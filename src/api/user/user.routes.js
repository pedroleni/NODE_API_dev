const UserRoutes = require('express').Router();
const rateLimit =require('express-rate-limit');
const { authorize } = require("../../middleware/auth");
const upload = require("../../middleware/file");

const {
    userById, 
    update, 
    remove, 
    register,
    login
} = require('./user.controller');


const userCreateRateLimit = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
});

UserRoutes.post('/register', userCreateRateLimit, register);
UserRoutes.post('/login', login);
UserRoutes.get('/:id', [authorize], userById);
UserRoutes.patch('/:id', authorize , update);
UserRoutes.delete('/:id', [authorize], remove);


module.exports = UserRoutes;