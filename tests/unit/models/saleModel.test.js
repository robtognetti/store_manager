const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { expect } = require("chai");

const saleModel = require("../../../src/models/saleModel");
const saleMock = require("../mocks/salesMock");
const connection = require("../../../src/models/connection");

describe("Testing Sale Model", () => {
  describe("Get All Sales", () => {
    afterEach(() => {
      sinon.restore();
    });
    it("Get by Id Sales", async () => {
      sinon.stub(connection, "execute").resolves([saleMock.mockgetSaleById]);

      await saleModel.getSaleById(1);
    });
    it("second", async () => {
      sinon.stub(connection, "execute").resolves(saleMock.mockAllSales);

      await saleModel.getAllSales();
    }); 
  });
});