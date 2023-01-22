const { productValidate } = require('../middlewares/validate');
const productsService = require('../services/productsService');

const deleteProduct = async (req, res) => {
  const id = Number(req.params.id);
  const { status, response } = await productsService.deleteProduct(id);
  if (status) {
 return res.status(status).send(
    response,
  ); 
}
  res.status(status).send(
    response,
  );
};

const getById = async (req, res) => {
  const id = Number(req.params.id);
  const product = await productsService.getById(id);
  if (product.err || product.length === 0 || !product) {
    return res.status(404).send(
      product.err,
    );
  }
  return res.status(200).send(
    product[0],
  );
};

const updateProducts = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const resultValidation = await productValidate(name);
  if (resultValidation) {
    return res.status(resultValidation.status).send(
      resultValidation.response,
    );
  }
  const result = await productsService.updateProducts(id, name);
  if (!result || result === 0) {
    return res.status(404).send({ message: 'Product not found' });
  }
  return res.status(200).send(
    {
      id,
      name,
    },
);
};

const addProduct = async (req, res) => {
  const { name } = req.body;
  const id = await productsService.addProduct(name);
  if (id.status) return res.status(id.status).send(id.response);
  return res.status(201).send(
    { id, name },
  );
};

const getAll = async (_req, res) => {
  const everyProduct = await productsService.getAll();
  res.status(200).send(
    everyProduct,
  );
};

module.exports = {
  getAll,
  getById,
  addProduct,
  updateProducts,
  deleteProduct,
};