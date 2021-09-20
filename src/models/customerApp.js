'use strict';

module.exports = class CustomerApp {
  constructor(customerApp) {
    this.customerId = customerApp.customerId;
    this.appId = customerApp.appId;
    this.userRole = customerApp.userRole;
    this.createdAt = customerApp.createdAt;
    this.updatedAt = customerApp.updatedAt;
  }

  get ID() {
    return this.appId;
  }

  toJson = () => ({
    customerId: this.customerId,
    appId: this.appId,
    userRole: this.userRole,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  });
};
