'use strict';
const moment = require('moment');
const uuid = require('uuid');
const AppController = require('../controllers/application');
const CustomerAppController = require('../controllers/customerApp');
const CustomerController = require('../controllers/customer');
const appContoller = new AppController();

module.exports = class Application {
  constructor(controller = appContoller) {
    this.controller = controller;
  }

  getItem = async (req, res, next) => {
    console.log('[Usecase][Application][getItem] Start get an application');
    try {
      if (!req.query || !req.query.id) {
        console.error('[Usecase][Application][getItem][Error] Application ID not found!');
        throw new Error('Application ID not found!');
      }

      const app = await this.controller.getItem(req.query.id);
      console.log(app);

      const customerAppController = new CustomerAppController();
      const customerApps = await customerAppController.queryItemsByApp(req.query.id);

      const customerController = new CustomerController();
      const customers = await Promise.all(customerApps.map(async (customerApp) => {
        const customer = await customerController.getItem(customerApp.customerId);
        return {
          id: customer.id,
          name: customer.name,
          role: customerApp.userRole
        };
      }));

      const ret = Object.assign(app, { developers: customers });

      res.status(200).send(JSON.stringify(ret));
    } catch(err) {
      console.error(err.stack);
      next(err);
    }
  }

  putItem = async (req, res, next) => {
    console.log('[Usecase][Application][putItem] Start put an application');
    try {
      if (!req.body || !req.body.customerId || !req.body.name) {
        console.error(
          '[Usecase][Application][putItem][Error] Request payload not found!'
        );
        throw new Error('Request payload not found!');
      }

      const now = moment().format('YYYY-MM-DDTHH:mm:ssZ');
      const app = {
        id: uuid.v4(),
        name: req.body.name,
        description: !req.body.description ? '' : req.body.description,
        createdAt: now,
        updatedAt: now
      };
      await this.controller.putItem(app);

      const customerApp = {
        customerId: req.body.customerId,
        appId: app.id,
        userRole: 'admin',
        createdAt: now,
        updatedAt: now
      };
      const customerAppController = new CustomerAppController();
      await customerAppController.putItem(customerApp);

      res.status(200).send(JSON.stringify(app));
    } catch(err) {
      next(err);
    }
  }

  deleteItem = async (req, res, next) => {
    console.log(
      '[Usecase][Application][deleteItem] Start delete an application'
    );

    try {
      if (!req.query || !req.query.id) {
        console.error(
          '[Usecase][Application][deleteItem][Error] Application ID not found!'
        );
        throw new Error('Application ID not found!');
      }

      const ret = await this.controller.deleteItem(req.query.id);
      res.status(200).send(JSON.stringify(ret));
    } catch(err) {
      console.error(err.stack);
      next(err);
    }
  }
};
