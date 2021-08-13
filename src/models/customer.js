'use strict';

module.exports = class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.email = customer.email;
    this.createdAt = customer.createdAt;
    this.updatedAt = customer.updatedAt;
  }

  get ID() {
    return this.id;
  }

  get Name() {
    return this.name;
  }

  toJson = () => ({
    id: this.id,
    name: this.name,
    email: this.email,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  });
};
