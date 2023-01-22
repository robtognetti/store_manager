const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const saleModel = require("../../../src/models/saleModel");
const saleService = require("../../../src/services/saleService");
const salesMock = require("../mocks/salesMock");

chai.use(sinonChai);
const { expect } = require("chai");

describe("Testing Sale Service", () => {
  describe("Get by Id", () => {
    it("first", async () => {
      sinon.stub(saleModel, "getSaleById").resolves(salesMock.mockOneSale);

      await saleService.getSaleById(1);
    });
  });

  describe("Get All", () => {
    it("second", async () => {
      sinon.stub(saleModel, "getAllSales").resolves(salesMock.mockAllSales);

      await saleService.getAllSales();
    });
  });

});