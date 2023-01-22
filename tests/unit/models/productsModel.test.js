const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { expect } = require("chai");

const productsModel = require("../../../src/models/productsModel");
const productsMock = require("../mocks/productsMock");
const connection = require("../../../src/models/connection");

describe("Testing Product Models", () => {
  describe("Update Products", () => {
    afterEach(() => {
      sinon.restore();
    });
    it("first", async () => {
      const addProductName = { name: "Teste" };
      const idProduct = 1;

      sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

      const result = await productsModel.updateProducts(
        idProduct,
        addProductName
      );

      expect(result).to.be.deep.equal(1);
    });
  });

  describe("Get by Id", () => {
    afterEach(() => {
      sinon.restore();
    });
    it("second", async () => {
      sinon
        .stub(connection, "execute")
        .resolves([productsMock.mockAllProducts[0]]);

      results = await productsModel.getById(1);

      expect(results).to.be.deep.equal(productsMock.mockOneProduct);
    });
  });

  describe("Get All", () => {
    afterEach(() => {
      sinon.restore();
    });
    it("third", async () => {
      sinon
        .stub(connection, "execute")
        .resolves([productsMock.mockAllProducts]);

      results = await productsModel.getAll();

      expect(results).to.be.deep.equal(productsMock.mockAllProducts);
    });
  });

});