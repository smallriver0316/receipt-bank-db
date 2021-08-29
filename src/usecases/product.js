'use strict';
const moment = require('moment');
const uuid = require('uuid');
const ProductController = require('../controllers/product');
const productController = new ProductController();

module.exports = class Product {
  constructor(controller = productController) {
    this.controller = controller;
  }

  getItem = async (req, res, next) => {
    console.log('[Usecase][Product][getItem] Start to get a product');

    try {
      if (!req.query || !req.query.appId || !req.query.productId) {
        throw new Error(
          '[Usecase][Product][getItem] Required parameters not found!'
        );
      }
      const ret = await this.controller.getItem(req.query.appId, req.query.productId);
      console.log(ret);
      res.status(200).send(JSON.stringify(ret));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }

  putItem = async (req, res, next) => {
    console.log('[Usecase][Product][putItem] Start to put a product');

    try {
      if (!req.body || !req.body.name || !req.body.appId || !req.body.store) {
        throw new Error(
          '[Usecase][Product][putItem][Error] Required prameters not found!'
        );
      }
      const now = moment().format('YYYY-MM-DDTHH:mm:ssZ');
      const data = {
        appId: req.body.appId,
        id: uuid.v4(),
        store: req.body.store,
        name: req.body.name,
        authority: {
          id: '',
          name: ''
        },
        createdAt: now,
        updatedAt: now
      };
      await this.controller.putItem(data);
      res.status(200).send(JSON.stringify(data));
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
        throw new Error(
          '[Usecase][Product][deleteItem][Error] Required parameters not found!'
        );
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
        throw new Error(
          '[Usecase][Product][queryItems][Error] Required parameters not found!'
        );
      }
      const storeName = !req.query.store ? '' : req.query.store;
      const ret = await this.controller.queryItems(req.query.appId, storeName);
      console.log(ret);
      res.status(200).send(JSON.stringify(ret));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }
};
