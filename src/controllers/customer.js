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

  getItem = async (id) => {
    console.log('[Controller][Customer][getItem] Start getItem');
    const params = {
      TableName: 'ReceiptBankDBTable',
      Key: {
        ppk: 'customer',
        psk: id
      }
    };
    const ret = await this.get(params);
    if (!ret.Item) {
      throw new Error('[Controller][Customer][getItem] Item not found!');
    }
    const item = new CustomerModel(ret.Item);
    return item.toJson();
  }

  putItem = async (data) => {
    console.log('[Controller][Customer][getItem] Start putItem');
    const params = {
      TableName: 'ReceiptBankDBTable',
      Item: {
        ppk: 'customer',
        psk: data.id,
        ...data
      }
    };
    const ret = await this.put(params);
    return ret;
  }

  updateItem = async () => {}

  deleteItem = async (id) => {
    console.log('[Controller][Customer][getItem] Start deleteItem');
    const params = {
      TableName: 'ReceiptBankDBTable',
      Key: {
        ppk: 'customer',
        psk: id
      }
    };
    const ret = await this.delete(params);
    return ret;
  }
};
