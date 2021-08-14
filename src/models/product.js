'use strict';
 
module.exports = class Product {
  constructor(product) {
    this.appId = product.appId;
    this.id = product.id;
    this.store = product.store;
    this.name = product.name;
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;
  }

  get ID() {
    return this.id;
  }

  get Name() {
    return this.name;
  }

  toJson = () => ({
    appId: this.appId,
    id: this.id,
    store: this.store,
    name: this.name,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  });
};
