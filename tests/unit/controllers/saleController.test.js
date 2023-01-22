const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const saleMock = require("../mocks/salesMock");
const saleService = require("../../../src/services/saleService");
const saleController = require("../../../src/controllers/saleController");

describe("Testing Sale Controller", () => {
  describe("Add Sales", () => {
    it("One", async () => {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();
      sinon.stub(saleService, "addSale").resolves({
        status: 201,
        response: { id: 1, itemsSold: [...saleMock.mockAllSales] },
      });

      await saleController.addSaleProduct(req, res);
    });
  });
});