const TecnologyRoutes = require("express").Router();
const { authorize } = require("../../middleware/auth");
const { getAll, getById, create, update, remove } = require("./tecnology.controller");

TecnologyRoutes.get('/', [authorize], getAll);
TecnologyRoutes.get('/:id', [authorize], getById);
TecnologyRoutes.post('/', [authorize], create);
TecnologyRoutes.patch('/:id', [authorize], update);
TecnologyRoutes.delete('/:id', [authorize], remove);


module.exports = TecnologyRoutes;