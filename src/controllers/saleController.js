const saleService = require('../services/saleService');

const getAllSales = async (_req, res) => {
  const allSales = await saleService.getAllSales();
  return res.status(200).send(
    allSales,
  );
};

const addSaleProduct = async (req, res) => {
  const { body } = req;
  const sale = await saleService.addSale(body);
  if (sale.status) {
    return res.status(sale.status).send(
      sale,
    );
  }
  res.status(201).send(
    sale,
  );
};

const getSaleById = async (req, res) => {
  const id = Number(req.params.id);
  const idSale = await saleService.getSaleById(id);
  if (idSale.error) {
    const { status } = idSale.error;
    res.status(status).send(
      idSale.error,
    );
  } else {
    return res.status(200).send(
      idSale,
    );
  }
};

module.exports = {
  addSaleProduct,
  getAllSales,
  getSaleById,
};