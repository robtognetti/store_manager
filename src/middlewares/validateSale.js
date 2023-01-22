const Joi = require('joi');
const productModels = require('../models/productsModel');

const saleCondition = Joi.object({
  productId: Joi.number().integer().min(1).required(),
  quantity: Joi.number().integer().min(1).required(),
});
//* help ernani *//
const idSales = async (sales) => {
  const maxId = await productModels.maxProduct();
  for (let index = 0; index < sales.length; index += 1) {
    if (sales[index].productId > maxId) {
      return { status: 404, message: 'Product not found' };
    }
  }
};
//   const idSales = await productModels.maxProduct(sales);
//   if (!idSales.length) {
//     return { status: 404, message: 'Product not found' };
//   }
// };

const validate = async (sales) => {
  const idValidSales = await idSales(sales);
  if (idValidSales) {
    return idSales(sales);
  }
  for (let i = 0; i < sales.length; i += 1) {
    const { error } = saleCondition.validate(sales[0]);
    if (error) {
      return {
        message: {
          error,
        },
      };
    }
  }
};

module.exports = {
  validate,
};