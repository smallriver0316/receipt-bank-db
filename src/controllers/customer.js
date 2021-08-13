'use strict';
const AWS = require('aws-sdk');
const DynamoDB = require('../aws/dynamodb');
const CustomerModel = require('../models/customer');

AWS.config.update({ region: process.env.REGION });

const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

module.exports = class Customer extends DynamoDB {
  constructor(client = docClient) {
    super(client);
  }

  getItem = async (params) => {
    console.log('[Controller][Customer][getItem] Start getItem');
    try {
      const ret = await this.get(params);
      if (!ret.Item) {
        throw new Error('[Controller][Customer][getItem] Item not found!');
      }
      const item = new CustomerModel(ret.Item);
      return item.toJson();
    } catch(err) {
      return err;
    }
  }
};
