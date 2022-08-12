const ToolRoutes = require("express").Router();
const { authorize } = require("../../middleware/auth");
const { getAll, getById, create, update, remove } = require("./tool.controller");
const upload = require("../../middleware/file");
const rateLimit = require("express-rate-limit");

const concertCreateRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1min
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

ToolRoutes.get('/', [authorize], getAll);
ToolRoutes.get('/:id', [authorize], getById);
ToolRoutes.post('/', [authorize], upload.single("imagen"), create);
ToolRoutes.patch('/:id', [authorize], upload.single("imagen"), update);
ToolRoutes.delete('/:id', [authorize], remove);


module.exports = ToolRoutes;