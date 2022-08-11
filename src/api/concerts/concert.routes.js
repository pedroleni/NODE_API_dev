const ConcertRoutes = require("express").Router();
const { authorize } = require("../../middleware/auth");
const { getAll, getById, create, update, remove } = require("./concert.controller");
const upload = require("../../middleware/file");
const rateLimit = require("express-rate-limit");

const concertCreateRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1min
  max: 2,
  standardHeaders: true,
  legacyHeaders: false,
});

ConcertRoutes.get('/', [authorize], getAll);
ConcertRoutes.get('/:id', [authorize], getById);
ConcertRoutes.post('/', [authorize], upload.single("ticket"), create);
ConcertRoutes.patch('/:id', [authorize], upload.single("ticket"), update);
ConcertRoutes.delete('/:id', [authorize], remove);


module.exports = ConcertRoutes;