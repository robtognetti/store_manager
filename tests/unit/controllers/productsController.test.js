const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const productsService = require("../../../src/services/productsService");
const productsController = require("../../../src/controllers/productsController");
const productsMock = require("../mocks/productsMock");

chai.use(sinonChai);
const { expect } = require("chai");

describe("Testing controller", () => {
  describe("Get by Id", () => {
    it("1", async () => {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();
      sinon
        .stub(productsService, "getById")
        .resolves(productsMock.mockOneProduct);

      await productsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(productsMock.mockOneProduct[0]);
    });
  });

  describe("Delete Product", () => {
    it("2", async () => {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();
      sinon.stub(productsService, "deleteProduct").resolves({ status: 204 });

      await productsController.deleteProduct(req, res);
    });
  });

  describe("Get All", () => {
    it("3", async () => {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();
      sinon
        .stub(productsService, "getAll")
        .resolves(productsMock.mockAllProducts);

      await productsController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(productsMock.mockAllProducts);
    });
  });

  describe("Update Products", () => {
    it("4", async () => {
      const res = {};
      const req = {
        params: { id: 1 },
        body: { name: "XXX" },
      };

      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();
      sinon
        .stub(productsService, "updateProducts")
        .resolves({ status: 200, response: { name: "XXX", id: 1 } });

      await productsController.updateProducts(req, res);
    });
  });

});