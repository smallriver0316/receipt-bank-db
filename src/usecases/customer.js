'use strict';
const moment = require('moment');
const uuid = require('uuid');
const CustomerController = require('../controllers/customer');
const customerController = new CustomerController();

module.exports = class Customer {
  constructor(controller = customerController) {
    this.controller = controller;
  }

  getItem = async (req, res, next) => {
    console.log('[Usecase][Customer][getItem] Start get a customer');
    try {
      if (!req.query || !req.query.id) {
        throw new Error(
          '[Usecase][Customer][getItem][Error] customer ID not found!'
        );
      }
      const ret = await this.controller.getItem(req.query.id);
      console.log(ret);
      res.status(200).send(JSON.stringify(ret));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }

  putItem = async (req, res, next) => {
    console.log('[Usecase][Customer][putItem] Start put a customer');
    try {
      if (!req.body || !req.body.name || !req.body.email) {
        throw new Error(
          '[Usecase][Customer][putItem][Error] Request payload not found!'
        );
      }

      const now = moment().format('YYYY-MM-DDTHH:mm:ssZ');
      const data = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        createdAt: now,
        updatedAt: now
      };
      await this.controller.putItem(data);
      res.status(200).send(JSON.stringify(data));
    } catch(err) {
      console.error(err.stack);
      next(err);
    }
  }

  deleteItem = async (req, res, next) => {
    console.log('[Usecase][Customer][deleteItem] Start delete a customer');
    try {
      if (!req.query || !req.query.id) {
        throw new Error(
          '[Usecase][Customer][getItem][Error] customer ID not found!'
        );
      }
      const ret = await this.controller.deleteItem(req.query.id);
      console.log(ret);
      res.status(200).send(JSON.stringify(ret));
    } catch(err) {
      console.error(err.stack);
      next(err);
    }
  }

  queryItems = async () => {}
};
