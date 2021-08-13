'use strict';

module.exports = class DynamoDB {
  constructor(client) {
    this.client = client;
  }

  async get(params) {
    console.log('[DynamoDB][get] start get record');

    return new Promise((resolve, reject) => {
      this.client.get(params, (err, data) => {
        if (err) {
          console.error('[DynamoDB][get][Error] Failed to get record');
          reject(err);
        } else {
          console.log('[DynamoDB][get] Succeeded to get record');
          resolve(data);
        }
      });
    });
  }

  async put(params) {
    console.log('[DynamoDB][put] start put record');

    return new Promise((resolve, reject) => {
      this.client.put(params, (err, data) => {
        if (err) {
          console.error('[DynamoDB][put][Error] Failed to put record');
          reject(err);
        } else {
          console.log('[DynamoDB][put] Succeeded to put record');
          resolve(data);
        }
      });
    });
  }
};
