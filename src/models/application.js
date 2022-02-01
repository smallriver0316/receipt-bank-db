'use strict';

module.exports = class Application {
  constructor(application) {
    this.id = application.id;
    this.name = application.name;
    this.description = application.description;
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
    description: this.description,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  });
};
