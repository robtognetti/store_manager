const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const productsModel = require("../../../src/models/productsModel");
const productsService = require("../../../src/services/productsService");
const productsMock = require("../mocks/productsMock");

chai.use(sinonChai);
const { expect } = require("chai");

describe("Testing Products Service", () => {
  describe("Get By Id", () => {
    afterEach(() => {
      sinon.restore();
    });
    it("first", async () => {
      const orderId = 1;
      sinon
        .stub(productsModel, "getById")
        .resolves(productsMock.mockAllProducts);
      results = await productsService.getById(orderId);
      expect(results).to.be.deep.equal(productsMock.mockAllProducts);
    });
    it("second", async () => {
      sinon.stub(productsModel, "getById").resolves([]);
      const orderId = 999;
      results = await productsService.getById(orderId);

      expect(results).to.be.deep.equal({
        err: { code: "not_found", message: "Product not found" },
      });
    });
  });

  describe("Test", () => {
    afterEach(() => {
      sinon.restore();
    });
    it("Get All", async () => {
      sinon
        .stub(productsModel, "getAll")
        .resolves(productsMock.mockAllProducts);

      results = await productsService.getAll();

      expect(results).to.be.deep.equal(productsMock.mockAllProducts);
    });
  });

});