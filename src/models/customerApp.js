'use strict';

module.exports = class CustomerApp {
  constructor(customerApp) {
    this.id = customerApp.id;
    this.appId = customerApp.appId;
    this.userRole = customerApp.userRole;
    this.createdAt = customerApp.createdAt;
    this.updatedAt = customerApp.updatedAt;
  }

  get ID() {
    return this.id;
  }

  toJson = () => ({
    id: this.id,
    appId: this.appId,
    userRole: this.userRole,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  });
};
