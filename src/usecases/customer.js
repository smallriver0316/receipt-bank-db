'use strict';
const CustomerController = require('../controllers/customer');

const customerController = new CustomerController();

module.exports = class Customer {
  constructor(controller = customerController) {
    this.controller = controller;
  }

  getCustomer(req, res) {
    res.send('Hello Customer');
  }
};
