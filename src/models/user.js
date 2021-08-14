'use strict';

module.exports = class User {
  constructor(user) {
    this.appId = user.appId;
    this.id = user.id;
    this.createdAt = user.createdAt;
  }

  get ID() {
    return this.id;
  }

  toJson = () => ({
    appId: this.appId,
    id: this.id,
    createdAt: this.createdAt
  });
};
