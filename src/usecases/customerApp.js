'use strict';
const moment = require('moment');
const CustomerAppController = require('../controllers/customerApp');
const customerAppController = new CustomerAppController();

module.exports = class CustomerApp {
  constructor(controller = customerAppController) {
    this.controller = controller;
  }

  getItem = async (req, res, next) => {
    console.log('[Usecase][CustomerApp][getItem] Start get a customerApp');

    try {
      if (!req.query || !req.query.customerId || !req.query.appId) {
        throw new Error(
          '[Usecase][CustomerApp][getItem][Error] Required parameters not found!'
        );
      }
      const ret = await this.controller.getItem(req.query.customerId, req.query.appId);
      console.log(ret);
      res.status(200).send(JSON.stringify(ret));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }

  putItem = async (req, res, next) => {
    console.log('[Usecase][CustomerApp][putItem] Start put a customerApp');

    try {
      if (!req.body || !req.body.customerId || !req.body.appId || !req.body.appName) {
        throw new Error(
          '[Usecase][CustomerApp][putItem][Error] Required parameters not found!'
        );
      }
      const now = moment().format('YYYY-MM-DDTHH:mm:ssZ');
      const data = {
        customerId: req.body.customerId,
        appId: req.body.appId,
        appName: req.body.appName,
        userRole: '',
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
    console.log('[Usecase][CustomerApp][deleteItem] Start delete a customerApp');

    try {
      if (!req.query || !req.query.customerId || !req.query.appId) {
        console.log(req.query);
        throw new Error(
          '[Usecase][CustomerApp][getItem][Error] Required parameters not found!'
        );
      }
      const ret = await this.controller.deleteItem(req.query.customerId, req.query.appId);
      console.log(ret);
      res.status(200).send(JSON.stringify(ret));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }

  queryItems = async (req, res, next) => {
    console.log('[Usecase][CustomerApp][queryItems] Start query customers');

    try {
      if (!req.query || !req.query.customerId) {
        throw new Error(
          '[Usecase][CustomerApp][queryItems][Error] Required parameters not found!'
        );
      }
      const ret = await this.controller.queryItems(req.query.customerId);
      console.log(ret);
      res.status(200).send(JSON.stringify(ret));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }
};
