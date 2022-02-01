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
        console.error(
          '[Usecase][Customer][getItem][Error] Customer ID not found!'
        );
        throw new Error('Customer ID not found!');
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
        console.error(
          '[Usecase][Customer][putItem][Error] Request payload not found!'
        );
        throw new Error('Request payload not found!');
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
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }

  deleteItem = async (req, res, next) => {
    console.log('[Usecase][Customer][deleteItem] Start delete a customer');

    try {
      if (!req.query || !req.query.id) {
        console.error(
          '[Usecase][Customer][getItem][Error] Customer ID not found!'
        );
        throw new Error('Customer ID not found!');
      }
      const ret = await this.controller.deleteItem(req.query.id);
      console.log(ret);
      res.status(200).send(JSON.stringify(ret));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }

  queryItems = async (req, res, next) => {
    console.log('[Usecase][Customer][queryItems] Start query customers');

    try {
      const ret = await this.controller.queryItems();
      console.log(ret);
      res.status(200).send(JSON.stringify(ret));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }

  getItemByEmail = async (req, res, next) => {
    console.log('[Usecase][Customer][getItemByEmail] Start getItem by Email');

    try {
      if (!req.query || !req.query.email) {
        console.error(
          '[Usecase][Customer][getItemByEmail][Error] Email not found!'
        );
        throw new Error('Email not found!');
      }
      const ret = await this.controller.getItemByEmail(req.query.email);
      console.log(ret);
      res.status(200).send(JSON.stringify(ret));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }
};
