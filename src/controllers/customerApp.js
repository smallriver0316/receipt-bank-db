'use strict';
const AWS = require('aws-sdk');
const DynamoDB = require('../aws/dynamodb');
const CustomerAppModel = require('../models/customerApp');

AWS.config.update({ region: process.env.REGION });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const DATA_NAME = 'customerapp';

module.exports = class CustomerApp extends DynamoDB {
  constructor(client = docClient) {
    super(client);
  }

  getItem = async (customerId, appId) => {
    console.log('[Controller][CustomerApp][getItem] Start getItem');

    const params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        ppk: DATA_NAME,
        psk: `${customerId}/${appId}`
      }
    };

    const ret = await this.get(params);
    if (!ret.Item) {
      throw new Error(
        '[Controller][CustomerApp][getItem][Error] Item not found!'
      );
    }

    const item = new CustomerAppModel(ret.Item);
    return item.toJson();
  }

  putItem = async (data) => {
    console.log('[Controller][CustomerApp][putItem] Start putItem');

    const params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        ppk: DATA_NAME,
        psk: `${data.customerId}/${data.appId}`,
        ...data
      }
    };

    const ret = await this.put(params);
    console.log(ret);
    return ret;
  }

  deleteItem = async (customerId, appId) => {
    console.log('[Controller][CustomerApp][deleteItem] Start deleteItem');

    const params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        ppk: DATA_NAME,
        psk: `${customerId}/${appId}`
      }
    };

    const ret = await this.delete(params);
    return ret;
  }

  queryItems = async (customerId) => {
    console.log('[Controller][CustomerApp][queryItems] Start queryItems');

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
        ':id': `${customerId}/`
      }
    };

    const ret = await this.query(params);
    console.log(ret);

    if (!ret.Items || ret.Items.length === 0) {
      throw new Error(
        '[Controller][CustomerApp][queryItems][Error] Items not found!'
      );
    }

    const items = ret.Items.map(item => {
      const customerApp = new CustomerAppModel(item);
      return customerApp.toJson();
    });
    return items;   
  }
};
