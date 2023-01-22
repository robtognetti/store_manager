const express = require('express');

const productsController = require('./controllers/productsController');

const salesController = require('./controllers/saleController');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 

app.put('/products/:id', productsController.updateProducts);

app.get('/products', productsController.getAll);

app.get('/products/:id', productsController.getById);

app.delete('/products/:id', productsController.deleteProduct);

app.get('/sales', salesController.getAllSales);

app.post('/products', productsController.addProduct);

app.get('/sales/:id', salesController.getSaleById);

app.post('/sales', salesController.addSaleProduct);

module.exports = app;