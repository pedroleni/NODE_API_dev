const Tecnology = require('./tecnology.model');
const { setError } = require('../../helpers/utils');

//----------------------------------------------------------------------------------------------
const getAll = async (req, res, next) => {
  try {
    const tecnology = await Tecnology.find().populate("tools");
    return res.json({
      status: 200,
      message: 'Recovered all tecnology',
      data: { tecnology}
    });
  } catch (error) {
    return next(setError(500, 'Failed all tecnology'));
  }
}
//----------------------------------------------------------------------------------------------
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tecnology = await Tecnology.findById(id).populate("tools");
    if (!tecnology) return next(setError(404, 'tecnology not found'))
    return res.json({
      status: 200,
      message: 'Recovered tecnology by id',
      data: { tecnology }
    });
  } catch (error) {
    return next(setError(500, 'Failed tecnology by id'))
  }
}
//----------------------------------------------------------------------------------------------
const getByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const tecnology = await Tecnology.find({ name: name }).populate("tools");
    if (!tecnology) return next(setError(404, 'tecnology not found'));
    return res.json({
      status: 200,
      message: 'Recovered tecnology by name',
      data: { tecnology }
    });
  } catch (error) {
    return next(setError(500, 'Failed tecnology by name'))
  }
}
//----------------------------------------------------------------------------------------------
const create = async (req, res, next) => {
  try {
    const tecnologyToSave = new Tecnology(req.body)
    const tecnologyInDb = await tecnologyToSave.save()
    return res.json({
      status: 201,
      message: 'Created new tecnology',
      data: { tecnologyInDb}
    });
  } catch (error) {
    return next(setError(500, 'Failed created tecnology'))
  }
}
//----------------------------------------------------------------------------------------------
const update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const patchTecnologyDB = new Tecnology(req.body);

    patchTecnologyDB._id = id;

    const tecnologyDB = await Tecnology.findByIdAndUpdate(id, patchTecnologyDB);

    if (!tecnologyDB) {
      return next("tecnology no encontrado");
    }
    return res.status(200).json({tecnologyDB});
  } catch (error) {
    return next("Error al modificar un tecnology", error);
  }
};
//----------------------------------------------------------------------------------------------
const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Tecnology.findByIdAndDelete(id);
    
    if (!deleted) return next(setError(404, 'tecnology not found'));
    return res.status(200).json({
      message: 'Delete tecnology',
      deleted
    })
  } catch (error) {
    return next(setError(500, error.message | 'tecnology deleted tool'));
  }
}
//----------------------------------------------------------------------------------------------
module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getByName
}