'use strict';

module.exports = class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.email = customer.email;
    this.createdAt = customer.createdAt;
    this.updatedAt = customer.updatedAt;
  }
};
