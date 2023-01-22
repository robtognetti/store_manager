const productsModel = require('../models/productsModel');
const { productValidate } = require('../middlewares/validate');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

// auxilio mentoria danielle //
const addProduct = async (name) => {
  const validateName = productValidate(name);
  // pega informacao de validacao do middleware validate //
  if (productValidate(name)) return validateName;
  const product = await productsModel.addProduct(name);
  if (addProduct(name)) return product;
};

// a funcao deleteProduct abaixo não funcionou e nao compreendi o porque,
// ja que alterando o return a mesma deveria funcionar. ?
// const deleteProduct = async (id) => {
//   const affectedRows = await productsModel.deleteProduct(id);

//   if (affectedRows) {
//     return { id };
//   }
//   return { type: "NOT_FOUND", message: "Product not found" };
// };
// auxilio mentoria danielle, ernani ajudou na refatoracao
const deleteProduct = async (id) => {
  const [product] = await productsModel.getById(id);
  if (!product || product.affectedRows === 0) {
    return {
      status: 404, response: { message: 'Product not found' },
    };
  }
  await productsModel.deleteProduct(id);
  return {
    status: 204,
  };
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  if (!product.length || product.length === 0) {
    return { err: { code: 'not_found', message: 'Product not found' } };
  }
  return productsModel.getById(id);
};

const updateProducts = async (id, name) => {
  const affectedRows = await productsModel.getById(id, name);
  if (affectedRows !== 0) {
    return productsModel.updateProducts(id, name);
  }
  return false;
};

module.exports = {
  getAll,
  getById,
  addProduct,
  updateProducts,
  deleteProduct,
};