'use strict';
const AWS = require('aws-sdk');
const DynamoDB = require('../aws/dynamodb');
const ReceiptModel = require('../models/receipt');

AWS.config.update({ region: process.env.REGION });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const DATA_NAME = 'receipt';

module.exports = class Receipt extends DynamoDB {
  constructor(client = docClient) {
    super(client);
  }

  getItem = async (appId, productId, userId, receiptId) => {
    console.log('[Controller][Receipt][getItem] Start getItem');

    const params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        ppk: DATA_NAME,
        psk: `${appId}/${productId}/${userId}/${receiptId}`
      }
    };

    const ret = await this.get(params);
    if (!ret.Item) {
      console.error('[Controller][Receipt][getItem][Error] Item not found!');
      throw new Error('Item not found!');
    }

    const item = new ReceiptModel(ret.Item);
    return item.toJson();
  }

  putItem = async (data) => {
    console.log('[Controller][Receipt][putItem] Start putItem');

    const params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        ppk: DATA_NAME,
        psk: `${data.appId}/${data.productId}/${data.userId}/${data.id}`,
        ...data
      }
    };

    const ret = await this.put(params);
    console.log(ret);

    return ret;
  }

  deleteItem = async (appId, productId, userId, receiptId) => {
    console.log('[Controller][Receipt][deleteItem] Start deleteItem');

    const params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        ppk: DATA_NAME,
        psk: `${appId}/${productId}/${userId}/${receiptId}`
      }
    };

    const ret = await this.delete(params);
    return ret;
  }

  queryItems = async (appId, productId = '', userId = '') => {
    console.log('[Controller][Product][queryItems] Start queryItems');

    let prefix = appId;
    if (productId !== '') {
      prefix = `${prefix}/${productId}`;
      if (userId !== '') {
        prefix = `${prefix}/${userId}`;
      }
    }

    const params = {
      TableName: process.env.TABLE_NAME,
      KeyConditionExpression:
        '#PartitionKey=:data and begins_with(#SortKey, :id)',
      ExpressionAttributeNames: {
        '#PartitionKey': 'ppk',
        '#SortKey': 'psk'
      },
      ExpressionAttributeValues: {
        ':data': DATA_NAME,
        ':id': prefix
      }
    };

    const ret = await this.query(params);
    console.log(ret);

    if (!ret.Items || ret.Items.length === 0) {
      console.error('[Controller][Receipt][queryItems][Error] Items not found!');
      throw new Error('Items not found!');
    }

    const items = ret.Items.map(item => {
      const product = new ReceiptModel(item);
      return product.toJson();
    });
    return items;
  }
};
