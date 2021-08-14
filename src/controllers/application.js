'use strict';
const AWS = require('aws-sdk');
const DynamoDB = require('../aws/dynamodb');
const AppModel = require('../models/application');

AWS.config.update({ region: process.env.REGION });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const DATA_NAME = 'application';

module.exports = class Application extends DynamoDB {
  constructor(client = docClient) {
    super(client);
  }

  getItem = async (id) => {
    console.log('[Controller][Application][getItem] Start getItem');

    const params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        ppk: DATA_NAME,
        psk: id
      }
    };

    const ret = await this.get(params);
    if (!ret.Item) {
      throw new Error(
        '[Controller][Application][getItem][Error] Item not found!'
      );
    }

    const item = new AppModel(ret.Item);
    return item.toJson();
  }

  putItem = async (data) => {
    console.log('[Controller][Application][putItem] Start putItem');

    const params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        ppk: DATA_NAME,
        psk: data.id,
        ...data
      }
    };

    const ret = await this.put(params);
    return ret;
  }

  deleteItem = async (id) => {
    console.log('[Controller][Application][deleteItem] Start deleteItem');

    const params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        ppk: DATA_NAME,
        psk: id
      }
    };

    const ret = await this.delete(params);
    return ret;
  }
};
