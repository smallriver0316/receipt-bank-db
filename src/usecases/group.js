'use strict';
const moment = require('moment');
const uuid = require('uuid');
const GroupController = require('../controllers/group');
const groupController = new GroupController();

module.exports = class Group {
  constructor(controller = groupController) {
    this.controller = controller;
  }

  getItem = async (req, res, next) => {
    console.log('[Usecase][Group][getItem] Start to get a group');

    try {
      if (!req.query || !req.query.planId || !req.query.groupId) {
        throw new Error(
          '[Usecase][Group][getItem] Required parameters not found!'
        );
      }
      const ret = await this.controller.getItem(req.query.planId, req.query.groupId);
      console.log(ret);
      res.status(200).send(JSON.stringify(ret));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }

  putItem = async (req, res, next) => {
    console.log('[Usecase][Group][putItem] Start to put a group');

    try {
      if (!req.body || !req.body.name || !req.body.planId) {
        throw new Error(
          '[Usecase][Group][putItem][Error] Required prameters not found!'
        );
      }
      const now = moment().format('YYYY-MM-DDTHH:mm:ssZ');
      const data = {
        planId: req.body.planId,
        id: uuid.v4(),
        name: req.body.name,
        description: !req.body.description ? '' : req.body.description,
        authorityId: '',
        authorityName: '',
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
    console.log('[Usecase][Group][deleteItem] Start to delete a group');

    try {
      if (!req.query || !req.query.planId || !req.query.groupId) {
        throw new Error(
          '[Usecase][Group][getItem][Error] Required parameters not found!'
        );
      }
      const ret = await this.controller.deleteItem(
        req.query.planId,
        req.query.groupId
      );
      res.status(200).send(JSON.stringify(ret));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }

  queryItems = async (req, res, next) => {
    console.log('[Usecase][Group][queryItems] Start to query groups');

    try {
      if (!req.query || !req.query.planId) {
        throw new Error(
          '[Usecase][Group][queryItems][Error] Required parameters not found!'
        );
      }
      const ret = await this.controller.queryItems(req.query.planId);
      console.log(ret);
      res.status(200).send(JSON.stringify(ret));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }
};
