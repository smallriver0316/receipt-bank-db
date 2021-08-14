'use strict';

module.exports = class Group {
  constructor(group) {
    this.planId = group.planId;
    this.id = group.id;
    this.name = group.name;
    this.description = group.description;
    this.productIds = group.productIds;
    this.authorityId = group.authorityId;
    this.authorityName = group.authorityName;
    this.createdAt = group.createdAt;
    this.updatedAt = group.updatedAt;
  }

  get ID() {
    return this.id;
  }

  get Name() {
    return this.name;
  }

  toJson = () => ({
    planId: this.planId,
    id: this.id,
    name: this.name,
    description: this.description,
    productIds: this.productIds,
    authorityId: this.authorityId,
    authorityName: this.authorityName,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  });
};
