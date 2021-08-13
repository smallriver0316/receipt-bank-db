'use strict';
const CustomerController = require('../controllers/customer');
const customerController = new CustomerController();

module.exports = class Customer {
  constructor(controller = customerController) {
    this.controller = controller;
  }

  get = async (req, res, next) => {
    console.log('[Usecase][get] Start get a customer');
    try {
      if (!req.query || !req.query.id) {
        throw new Error('[Usecase][get][Error] customer ID not found!');
      }

      const id = req.query.id;
      const params = {
        TableName: 'ReceiptBankDBTable',
        Key: {
          ppk: 'customer',
          psk: id
        }
      };

      const ret = await this.controller.getRecord(params);
      console.log(ret);
      res.status(200).send(JSON.stringify(ret));
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  }
};
