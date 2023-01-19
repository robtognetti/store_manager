const productsModel = require('../models/productsModel');

const findAll = async () => {
  const products = await productsModel.findAll();
  return products;
};

const findById = async (id) => {
  const result = await productsModel.findById(id);
  if (!result.length || result.length === 0) {
    return { err: { code: 'not_found', message: 'Product not found' } };
  }
  return result;
};

module.exports = {
  findAll,
  findById,
};