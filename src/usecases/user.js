'use strict';
const moment = require('moment');
const uuid = require('uuid');
const UserController = require('../controllers/user');
const userController = new UserController();

module.exports = class User {
  constructor(controller = userController) {
    this.controller = controller;
  }

  getItem = async (req, res, next) => {
    console.log('[Usecase][User][getItem] Start to get a user');

    try {
      if (!req.query || !req.query.appId || !req.query.userId) {
        throw new Error(
          '[Usecase][User][getItem] Required parameters not found!'
        );
      }
      const ret = await this.controller.getItem(req.query.appId, req.query.userId);
      console.log(ret);
      res.status(200).send(JSON.stringify(ret));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }

  putItem = async (req, res, next) => {
    console.log('[Usecase][User][putItem] Start to put a user');

    try {
      if (!req.body || !req.body.appId) {
        throw new Error(
          '[Usecase][User][putItem][Error] Required prameters not found!'
        );
      }
      const now = moment().format('YYYY-MM-DDTHH:mm:ssZ');
      const data = {
        appId: req.body.appId,
        id: uuid.v4(),
        createdAt: now
      };
      await this.controller.putItem(data);
      res.status(200).send(JSON.stringify(data));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }

  queryItems = async (req, res, next) => {
    console.log('[Usecase][User][queryItems] Start to query users');

    try {
      if (!req.query || !req.query.appId) {
        throw new Error(
          '[Usecase][User][queryItems][Error] Required parameters not found!'
        );
      }
      const ret = await this.controller.queryItems(req.query.appId);
      console.log(ret);
      res.status(200).send(JSON.stringify(ret));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }
};
