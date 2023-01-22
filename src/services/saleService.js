const saleModel = require('../models/saleModel');
const middlewares = require('../middlewares/validateSale');

const addSale = async (sales) => {
  const error = await middlewares.validate(sales);
  if (error) {
    return middlewares.validate(sales);
  }

  const id = await saleModel.addSale(sales);
  return {
    message: {
      id,
      itemsSold: sales,
    },
  };
};

const getAllSales = async () => {
  const sales = await saleModel.getAllSales();
  return sales;
};

const getSaleById = async (id) => {
  const sale = await saleModel.getSaleById(id);
  if (sale.length === 0 || !sale) {
    return {
      error: {
        status: 404, message: 'Sale not found',
      },
    };
  }
  return saleModel.getSaleById(id);
};

module.exports = {
  addSale,
  getAllSales,
  getSaleById,
};