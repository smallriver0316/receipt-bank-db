'use strict';

module.exports = class Receipt {
  constructor(receipt) {
    this.appId = receipt.appId;
    this.productId = receipt.productId;
    this.userId = receipt.userId;
    this.id = receipt.id;
    this.createdAt = receipt.createdAt;
    this.updatedAt = receipt.updatedAt;
  }

  get ID() {
    return this.id;
  }

  toJson = () => ({
    appId: this.appId,
    productId: this.productId,
    userId: this.userId,
    id: this.id,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  });
};
