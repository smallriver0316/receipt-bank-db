'use strict';
const moment = require('moment');
const uuid = require('uuid');
const PlanController = require('../controllers/plan');
const planController = new PlanController();

module.exports = class Plan {
  constructor(controller = planController) {
    this.controller = controller;
  }

  getItem = async (req, res, next) => {
    console.log('[Usecase][Plan][getItem] Start to get a plan');

    try {
      if (!req.query || !req.query.appId || !req.query.planId) {
        throw new Error(
          '[Usecase][Plan][getItem] Required parameters not found!'
        );
      }
      const ret = await this.controller.getItem(req.query.appId, req.query.planId);
      console.log(ret);
      res.status(200).send(JSON.stringify(ret));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }

  putItem = async (req, res, next) => {
    console.log('[Usecase][Plan][putItem] Start to put a plan');

    try {
      if (!req.body || !req.body.name || !req.body.appId) {
        throw new Error(
          '[Usecase][Plan][putItem][Error] Required prameters not found!'
        );
      }
      const now = moment().format('YYYY-MM-DDTHH:mm:ssZ');
      const data = {
        appId: req.body.appId,
        id: uuid.v4(),
        name: req.body.name,
        description: !req.body.description ? '' : req.body.description,
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
    console.log('[Usecase][Plan][deleteItem] Start to delete a plan');

    try {
      if (!req.query || !req.query.appId || !req.query.planId) {
        throw new Error(
          '[Usecase][Plan][getItem][Error] Required parameters not found!'
        );
      }
      const ret = await this.controller.deleteItem(
        req.query.appId,
        req.query.planId
      );
      res.status(200).send(JSON.stringify(ret));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }

  queryItems = async (req, res, next) => {
    console.log('[Usecase][Plan][queryItems] Start to query plans');

    try {
      if (!req.query || !req.query.appId) {
        throw new Error(
          '[Usecase][Plan][queryItems][Error] Required parameters not found!'
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
