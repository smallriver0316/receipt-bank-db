'use strict';
const moment = require('moment');
const uuid = require('uuid');
const AuthorityController = require('../controllers/authority');
const authorityController = new AuthorityController();

module.exports = class Authority {
  constructor(controller = authorityController) {
    this.controller = controller;
  }

  getItem = async (req, res, next) => {
    console.log('[Usecase][Authority][getItem] Start get an authority');

    try {
      if (!req.query || !req.query.appId || !req.query.authorityId) {
        console.error(
          '[Usecase][Authority][getItem][Error] Required parameters not found!'
        );
        throw new Error('Required parameters not found!');
      }
      const ret = await this.controller.getItem(
        req.query.appId,
        req.query.authorityId
      );
      console.log(ret);
      res.status(200).send(JSON.stringify(ret));
    } catch(err) {
      console.error(err.stack);
      next(err);
    }
  }

  putItem = async (req, res, next) => {
    console.log('[Usecase][Authority][putItem] Start put an authority');

    try {
      if (!req.body || !req.body.appId || !req.body.name) {
        console.error('[Usecase][Authority][putItem] Required parameters not found!');
        throw new Error('Required parameters not found!');
      }
      const now = moment().format('YYYY-MM-DDTHH:mm:ssZ');
      const data = {
        appId: req.body.appId,
        id: uuid.v4(),
        name: req.body.name,
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
    console.log('[Usecase][Authority][deleteItem] Start delete an authority');

    try {
      if (!req.query || !req.query.appId || !req.query.authorityId) {
        console.error(
          '[Usecase][Authority][getItem][Error] Required parameters not found!'
        );
        throw new Error('Required parameters not found!');
      }
      const ret = await this.controller.deleteItem(
        req.query.appId,
        req.query.authorityId
      );
      res.status(200).send(JSON.stringify(ret));
    } catch(err) {
      console.error(err.stack);
      next(err);
    }
  }

  queryItems = async (req, res, next) => {
    console.log('[Usecase][Authority][queryItems] Start query authorities');

    try {
      if (!req.query || !req.query.appId) {
        console.error(
          '[Usecase][Authority][queryItems][Error] Required parameters not found!'
        );
        throw new Error('Required parameters not found!');
      }
      const ret = await this.controller.queryItems(req.query.appId);
      console.log(ret);
      res.status(200).send(JSON.stringify(ret));
    } catch(err) {
      console.error(err.stack);
      next(err);
    }
  }
};
