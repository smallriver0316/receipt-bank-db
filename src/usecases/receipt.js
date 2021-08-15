'use strict';
const moment = require('moment');
const uuid = require('uuid');
const ReceiptController = require('../controllers/receipt');
const receiptController = new ReceiptController();

module.exports = class Receipt {
  constructor(controller = receiptController) {
    this.controller = controller;
  }

  getItem = async (req, res, next) => {
    console.log('[Usecase][Receipt][getItem] Start to get a receipt');

    try {
      if (
        !req.query ||
        !req.query.appId ||
        !req.query.productId ||
        !req.query.userId ||
        !req.query.receiptId
      ) {
        throw new Error(
          '[Usecase][Receipt][getItem][Error] Required parameters not found!'
        );
      }
      const ret = await this.controller.getItem(
        req.query.appId,
        req.query.productId,
        req.query.userId,
        req.query.receiptId
      );
      console.log(ret);
      res.status(200).send(JSON.stringify(ret));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }

  putItem = async (req, res, next) => {
    console.log('[Usecase][Receipt][putItem] Start to put a receipt');

    try {
      if (!req.body || !req.body.appId || !req.body.productId || !req.body.userId) {
        throw new Error(
          '[Usecase][Receipt][putItem][Error] Required parameters not found!'
        );
      }
      const now = moment().format('YYYY-MM-DDTHH:mm:ssZ');
      const data = {
        id: uuid.v4(),
        createdAt: now,
        updatedAt: now,
        ...req.body 
      };
      await this.controller.putItem(data);
      res.status(200).send(JSON.stringify(data));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }

  deleteItem = async (req, res, next) => {
    console.log('[Usecase][Receipt][deleteItem] Start to delete a receipt');

    try {
      if (
        !req.query ||
        !req.query.appId ||
        !req.query.productId ||
        !req.query.userId ||
        !req.query.receiptId
      ) {
        throw new Error(
          '[Usecase][Receipt][getItem][Error] Required parameters not found!'
        );
      }
      const ret = await this.controller.deleteItem(
        req.query.appId,
        req.query.productId,
        req.query.userId,
        req.query.receiptId
      );
      res.status(200).send(JSON.stringify(ret));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }

  queryItems = async (req, res, next) => {
    console.log('[Usecase][Receipt][queryItems] Start to query receipts');

    try {
      if (!req.query || !req.query.appId) {
        throw new Error(
          '[Usecase][Receipt][queryItems][Error] Required parameters not found!'
        );
      }
      const productId = !req.query.productId ? '' : req.query.productId;
      const userId = !req.query.userId ? '' : req.query.userId;
      const ret = await this.controller.queryItems(
        req.query.appId,
        productId,
        userId
      );
      console.log(ret);
      res.status(200).send(JSON.stringify(ret));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }
};
