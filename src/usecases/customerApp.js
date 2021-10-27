'use strict';
const moment = require('moment');
const CustomerAppController = require('../controllers/customerApp');
const AppController = require('../controllers/application');
const CustomerController = require('../controllers/customer');
const customerAppController = new CustomerAppController();

module.exports = class CustomerApp {
  constructor(controller = customerAppController) {
    this.controller = controller;
  }

  getItem = async (req, res, next) => {
    console.log('[Usecase][CustomerApp][getItem] Start get a customerApp');

    try {
      if (!req.query || !req.query.customerId || !req.query.appId) {
        console.error(
          '[Usecase][CustomerApp][getItem][Error] Required parameters not found!'
        );
        console.error(req.query);
        throw new Error('Required parameters not found!');
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
        console.error(
          '[Usecase][CustomerApp][putItem][Error] Required parameters not found!'
        );
        console.error(req.body);
        throw new Error('Required parameters not found!');
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
        console.error(
          '[Usecase][CustomerApp][getItem][Error] Required parameters not found!'
        );
        console.error(req.query);
        throw new Error('Required parameters not found!');
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
        console.error(
          '[Usecase][CustomerApp][queryItems][Error] Required parameters not found!'
        );
        console.error(req.query);
        throw new Error('Required parameters not found!');
      }
      const customerapps = await this.controller.queryItems(req.query.customerId);
      console.log(customerapps);

      const appController = new AppController();
      const ret = await Promise.all(customerapps.map(async (customerapp) => {
        const app = await appController.getItem(customerapp.appId);
        return Object.assign(customerapp, {
          appName: app.name,
          description: app.description
        });
      }));
      console.log(ret);

      res.status(200).send(JSON.stringify(ret));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }

  queryItemsByApp = async (req, res, next) => {
    console.log('[Usecase][CustomerApp][queryItemsByApp] Start query customers by app');

    try {
      if (!req.query || !req.query.appId) {
        console.error(
          '[Usecase][CustomerApp][queryItemsByApp][Error] Required parameter not found!'
        );
        console.error(req.query);
        throw new Error('Required parameter not found!');
      }

      const customerapps = await this.controller.queryItemsByApp(req.query.appId);
      console.log(customerapps);

      const customerController = new CustomerController();
      const ret = await Promise.all(customerapps.map(async (customerapp) => {
        const customer = await customerController.getItem(customerapp.customerId);
        return Object.assign(customerapp, { customerName: customer.name });
      }));
      console.log(ret);

      res.status(200).send(JSON.stringify(ret));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }
};
