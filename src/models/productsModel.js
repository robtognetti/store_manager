const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(query);
  return products;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [product] = await connection.execute(query, [id]);
  return product;
};

const addProduct = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [product] = await connection.execute(query, [name]);
  return product.insertId;
};

const maxProduct = async () => {
  const queryProducts = 'SELECT MAX(id) as id FROM products';
  const [[maxId]] = await connection.execute(queryProducts);
  return maxId.id;
};

const updateProducts = async (id, name) => {
  const query = `UPDATE StoreManager.products
  SET name = ?
  WHERE id = ?`;
  const [product] = await connection.execute(query, [name, id]);
  const { affectedRows } = product;
  return affectedRows;
};

const deleteProduct = async (id) => {
  const query = `
  DELETE FROM StoreManager.products WHERE id = ?
  `;
  const [result] = await connection.execute(query, [id]);
  const { affectedRows } = result;
  return affectedRows;
};

module.exports = {
  getAll,
  getById,
  addProduct,
  maxProduct,
  updateProducts,
  deleteProduct,
};