const Tool = require('./tool.model');
const { setError } = require('../../helpers/utils');
const { deleteFile } = require("../../middleware/delete-file");

//----------------------------------------------------------------------------------------------
const getAll = async (req, res, next) => {
  try {
    const tool = await Tool.find();
    return res.json({
      status: 200,
      message: 'Recovered all tools',
      data: { tool}
    });
  } catch (error) {
    return next(setError(500, 'Failed all tool'));
  }
}
//----------------------------------------------------------------------------------------------
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tool = await Tool.findById(id);
    if (!tool) return next(setError(404, 'tool not found'))
    return res.json({
      status: 200,
      message: 'Recovered tool by id',
      data: { tool }
    });
  } catch (error) {
    return next(setError(500, 'Failed tool by id'))
  }
}
//----------------------------------------------------------------------------------------------
const getByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const tool = await Tool.find({ name: name });
    if (!tool) return next(setError(404, 'Tool not found'));
    return res.json({
      status: 200,
      message: 'Recovered tool by name',
      data: { tool }
    });
  } catch (error) {
    return next(setError(500, 'Failed tool by name'))
  }
}
//----------------------------------------------------------------------------------------------
const create = async (req, res, next) => {
  try {
    const toolToSave = new Tool(req.body)
    if (req.file) toolToSave.imagen = req.file.path;
    const toolInDb = await toolToSave.save()
    return res.json({
      status: 201,
      message: 'Created new tool',
      data: { toolInDb}
    });
  } catch (error) {
    return next(setError(500, 'Failed created tool'))
  }
}
//----------------------------------------------------------------------------------------------
const update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const patchToolDB = new Tool(req.body);

    patchToolDB._id = id;

    const ToolDB = await Tool.findByIdAndUpdate(id, patchToolDB);

    if (req.file) {
      deleteFile(ToolDB.imagen);
    }

    if (req.file) {
      patchToolDB.imagen = req.file.path;
    }

    if (!ToolDB) {
      return next("Tool no encontrado");
    }
    return res.status(200).json({patchToolDB});
  } catch (error) {
    return next("Error al modificar un tool", error);
  }
};
//----------------------------------------------------------------------------------------------
const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Tool.findByIdAndDelete(id);
    
    if (!deleted) return next(setError(404, 'tool not found'));

    if (deleted.imagen) deleteFile(deleted.imagen);
    return res.status(200).json({
      message: 'Delete tool',
      deleted
    })
  } catch (error) {
    return next(setError(500, error.message | 'Failed deleted tool'));
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