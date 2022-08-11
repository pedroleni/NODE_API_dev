const Concert = require('./concert.model');
const { setError } = require('../../helpers/utils');
const { deleteFile } = require("../../middleware/delete-file");

//----------------------------------------------------------------------------------------------
const getAll = async (req, res, next) => {
  try {
    const concert = await Concert.find().populate("artist visitor comment");
    return res.json({
      status: 200,
      message: 'Recovered all Concerts',
      data: { concert}
    });
  } catch (error) {
    return next(setError(500, 'Failed all Concerts'));
  }
}
//----------------------------------------------------------------------------------------------
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const concert = await Concert.findById(id).populate("artist visitor comment");
    if (!concert) return next(setError(404, 'concert not found'))
    return res.json({
      status: 200,
      message: 'Recovered concert by id',
      data: { concert }
    });
  } catch (error) {
    return next(setError(500, 'Failed concert by id'))
  }
}
//----------------------------------------------------------------------------------------------
const getByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const concert = await Concert.find({ name: name });
    if (!concert) return next(setError(404, 'Concert not found'));
    return res.json({
      status: 200,
      message: 'Recovered concert by name',
      data: { concert }
    });
  } catch (error) {
    return next(setError(500, 'Failed concert by name'))
  }
}
//----------------------------------------------------------------------------------------------
const create = async (req, res, next) => {
  try {
    const concertToSave = new Concert(req.body)
    if (req.file) concertToSave.ticket = req.file.path;
    const concertInDb = await concertToSave.save()
    return res.json({
      status: 201,
      message: 'Created new concert',
      data: { concertInDb}
    });
  } catch (error) {
    return next(setError(500, 'Failed created concert'))
  }
}
//----------------------------------------------------------------------------------------------
const update = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const patchConcertDB = new Concert(req.body);
  
      patchConcertDB._id = id;
  
      const ConcertDB = await Concert.findByIdAndUpdate(id, patchConcertDB);
  
      if (req.file) {
        deleteFile(ConcertDB.ticket);
      }
  
      if (req.file) {
        patchConcertDB.ticket = req.file.path;
      }
  
      if (!ConcertDB) {
        return next("Concert no encontrado");
      }
      return res.status(200).json({ new: patchConcertDB, old: ConcertDB });
    } catch (error) {
      return next("Error al modificar un concert", error);
    }
  };
//----------------------------------------------------------------------------------------------
const remove = async (req, res, next) => {
    try {
      const { id } = req.params;
      const concertDB = await Concert.findByIdAndDelete(id);
  
      if (!concertDB) {
        return next("Concert no encontrado");
      }
  
      if (concertDB) {
        deleteFile(concertDB.ticket);
      }

      return res.status(200).json(concertDB);
    } catch (error) {
      return next("El concert no se puede eliminar", error);
    }
  };
//----------------------------------------------------------------------------------------------
module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getByName
}