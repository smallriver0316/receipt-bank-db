'use strict';

module.exports = class CustomerApp {
  constructor(customerApp) {
    this.customerId = customerApp.customerId;
    this.appId = customerApp.appId;
    this.appName = customerApp.appName;
    this.userRole = customerApp.userRole;
    this.createdAt = customerApp.createdAt;
    this.updatedAt = customerApp.updatedAt;
  }

  get ID() {
    return this.appId;
  }

  get Name() {
    return this.appName;
  }

  toJson = () => ({
    customerId: this.customerId,
    appId: this.appId,
    appName: this.appName,
    userRole: this.userRole,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  });
};
