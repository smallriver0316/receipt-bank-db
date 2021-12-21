'use strict';
const moment = require('moment');
const uuid = require('uuid');
const ProductController = require('../controllers/product');
const AuthorityController = require('../controllers/authority');
const productController = new ProductController();

module.exports = class Product {
  constructor(controller = productController) {
    this.controller = controller;
  }

  getItem = async (req, res, next) => {
    console.log('[Usecase][Product][getItem] Start to get a product');

    try {
      if (!req.query || !req.query.appId || !req.query.productId) {
        console.error(
          '[Usecase][Product][getItem] Required parameters not found!'
        );
        throw new Error('Required parameters not found!');
      }

      const product = await this.controller.getItem(req.query.appId, req.query.productId);

      const authorityController = new AuthorityController();
      const authority = await authorityController.getItem(
        product.appId,
        product.authority.id
      );
      product.authority.name = authority.name;

      res.status(200).send(JSON.stringify(product));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }

  putItem = async (req, res, next) => {
    console.log('[Usecase][Product][putItem] Start to put a product');

    try {
      if (!req.body || !req.body.name || !req.body.appId || !req.body.store) {
        console.error(
          '[Usecase][Product][putItem][Error] Required prameters not found!'
        );
        throw new Error('Required prameters not found!');
      }
      const now = moment().format('YYYY-MM-DDTHH:mm:ssZ');
      const product = {
        appId: req.body.appId,
        id: !req.body.id ? uuid.v4() : req.body.id,
        store: req.body.store,
        storeProductId: !req.body.storeProductId ? '' : req.body.storeProductId,
        name: req.body.name,
        authority: !req.body.authority ? { id: '' } : req.body.authority,
        createdAt: !req.body.createdAt ? now : req.body.createdAt,
        updatedAt: now
      };
      await this.controller.putItem(product);

      if (req.body.authority && req.body.authority.id) {
        const authorityController = new AuthorityController();
        const authority = await authorityController.getItem(
          product.appId,
          product.authority.id
        );
        product.authority = {
          id: authority.id,
          name: authority.name
        };
      }

      res.status(200).send(JSON.stringify(product));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }

  deleteItem = async (req, res, next) => {
    console.log('[Usecase][Product][deleteItem] Start to delete a product');

    try {
      if (!req.query || !req.query.appId || !req.query.productId) {
        console.log(req.query);
        console.error(
          '[Usecase][Product][deleteItem][Error] Required parameters not found!'
        );
        throw new Error('Required parameters not found!');
      }
      const ret = await this.controller.deleteItem(
        req.query.appId,
        req.query.productId
      );
      res.status(200).send(JSON.stringify(ret));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }

  queryItems = async (req, res, next) => {
    console.log('[Usecase][Product][queryItems] Start to query products');

    try {
      if (!req.query || !req.query.appId) {
        console.error(
          '[Usecase][Product][queryItems][Error] Required parameters not found!'
        );
        throw new Error('Required parameters not found!');
      }
      const storeName = !req.query.store ? '' : req.query.store;
      const products = await this.controller.queryItems(req.query.appId, storeName);

      const authorityController = new AuthorityController();
      const ret = await Promise.all(products.map(async (product) => {
        const authority = await authorityController.getItem(
          product.appId,
          product.authority.id
        );
        product.authority.name = authority.name;
        return product;
      }));
      res.status(200).send(JSON.stringify(ret));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }

  batchDeleteItems = async (req, res, next) => {
    console.log('[Usecase][Product][batchDeleteItems] Start batch delete products');

    try {
      if (!req.query || !req.query.appId || !req.query.productId) {
        console.error(
          '[Usecase][Product][batchDeleteItems][Error] Required parameters not found'
        );
        throw new Error('Required parameters not found');
      }

      let productIds = [];
      if (Array.isArray(req.query.productId)) {
        productIds = req.query.productId;
      } else {
        productIds = [req.query.productId];
      }

      const ret = await this.controller.batchDeleteItems(
        req.query.appId,
        productIds
      );
      res.status(200).send(JSON.stringify(ret));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }
};
