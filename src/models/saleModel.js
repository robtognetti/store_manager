const connection = require('./connection');
// auxilio monitoria e marcos, porem ainda tenho duvidas na implementacao //
const addSale = async (sales) => {
  const query = 'INSERT INTO sales (date) values (NOW())';
  const [sale] = await connection.execute(query);
  const idSale = sale.insertId;
  const promises = [];
  sales.forEach((element) => {
    const insertQuery = `INSERT INTO sales_products
      (sale_id, product_id, quantity) VALUES (?, ?, ?)`;
    const insert = connection.execute(insertQuery, [
      idSale,
      element.productId,
      element.quantity,
    ]);
    promises.push(
      insert,
    );
  });
  await Promise.all(promises);
  return sale.insertId;
};
// auxilio monitoria danielle //
const getAllSales = async () => {
  const [result] = await connection.execute(`SELECT sa.id AS saleId,
      sa.date, sp.product_id AS productId, sp.quantity
      FROM sales AS sa
      INNER JOIN sales_products AS sp
      ON sa.id = sp.sale_id;`);
  return result;
};

const getSaleById = async (id) => {
  const [result] = await connection.execute(
    `SELECT sa.date, sp.product_id AS productId, sp.quantity
      FROM sales AS sa
      INNER JOIN sales_products AS sp
      ON sa.id = sp.sale_id
      WHERE sa.id = ?`,
    [id],
  );
  return result;
};

module.exports = {
  addSale,
  getAllSales,
  getSaleById,
};