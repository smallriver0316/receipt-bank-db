'use strict';

module.exports = class DynamoDB {
  constructor(client) {
    this.client = client;
  }

  get = async (params) => {
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

  put = async (params) => {
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

  query = async (params) => {
    console.log('[DynamoDB][query] start query records');

    return new Promise((resolve, reject) => {
      this.client.query(params, (err, data) => {
        if (err) {
          console.error('[DynamoDB][query][Error] Failed to query records');
          reject(err);
        } else {
          console.log('[DynamoDB][query] Succeeded to query records');
          resolve(data);
        }
      });
    });
  }
};
