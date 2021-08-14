'use strict';

module.exports = class Application {
  constructor(application) {
    this.id = application.id;
    this.name = application.name;
    this.createdAt = application.createdAt;
    this.updatedAt = application.updatedAt;
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
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  });
};
