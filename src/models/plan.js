'use strict';

module.exports = class Plan {
  constructor(plan) {
    this.appId = plan.appId;
    this.id = plan.id;
    this.name = plan.name;
    this.description = plan.description;
    this.createdAt = plan.createdAt;
    this.updatedAt = plan.updatedAt;
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
    description: this.description,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  });
};
