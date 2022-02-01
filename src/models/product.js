'use strict';
 
module.exports = class Product {
  constructor(product) {
    this.appId = product.appId;
    this.id = product.id;
    this.name = product.name;
    this.store = product.store;
    this.storeProductId = product.storeProductId;
    this.authority = product.authority;
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;
  }

  get ID() {
    return this.id;
  }

  get Name() {
    return this.name;
  }

  get Store() {
    return this.store;
  }

  toJson = () => ({
    appId: this.appId,
    id: this.id,
    name: this.name,
    store: this.store,
    storeProductId: this.storeProductId,
    authority: this.authority,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  });
};
