'use strict';
const moment = require('moment');
const uuid = require('uuid');
const AppController = require('../controllers/application');
const appContoller = new AppController();

module.exports = class Application {
  constructor(controller = appContoller) {
    this.controller = controller;
  }

  getItem = async (req, res, next) => {
    console.log('[Usecase][Application][getItem] Start get an application');
    try {
      if (!req.query || !req.query.id) {
        throw new Error(
          '[Usecase][Application][getItem][Error] Application ID not found!'
        );
      }

      const ret = await this.controller.getItem(req.query.id);
      console.log(ret);
      res.status(200).send(JSON.stringify(ret));
    } catch(err) {
      console.error(err.stack);
      next(err);
    }
  }

  putItem = async (req, res, next) => {
    console.log('[Usecase][Application][putItem] Start put an application');
    try {
      if (!req.body || !req.body.name) {
        throw new Error(
          '[Usecase][Application][putItem][Error] Request payload not found!'
        );
      }

      const now = moment().format('YYYY-MM-DDTHH:mm:ssZ');
      const data = {
        id: uuid.v4(),
        name: req.body.name,
        createdAt: now,
        updatedAt: now
      };

      await this.controller.putItem(data);
      res.status(200).send(JSON.stringify(data));
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
        throw new Error(
          '[Usecase][Application][deleteItem][Error] Application ID not found!'
        );
      }

      const ret = await this.controller.deleteItem(req.query.id);
      res.status(200).send(JSON.stringify(ret));
    } catch(err) {
      console.error(err.stack);
      next(err);
    }
  }
};