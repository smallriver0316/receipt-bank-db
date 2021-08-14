'use strict';

module.exports = class Authority {
  constructor(authority) {
    this.appId = authority.appId;
    this.id = authority.id;
    this.name = authority.name;
    this.createdAt = authority.createdAt;
    this.updatedAt = authority.updatedAt;
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
    name: this.name,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  });
};
