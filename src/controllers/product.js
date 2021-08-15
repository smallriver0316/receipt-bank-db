'use strict';
const AWS = require('aws-sdk');
const DynamoDB = require('../aws/dynamodb');
const ProductModel = require('../models/product');

AWS.config.update({ region: process.env.REGION });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const DATA_NAME = 'product';

module.exports = class Product extends DynamoDB {
  constructor(client = docClient) {
    super(client);
  }

  getItem = async (appId, productId) => {
    console.log('[Controller][Product][getItem] Start getItem');

    const params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        ppk: DATA_NAME,
        psk: `${appId}/${productId}`
      }
    };

    const ret = await this.get(params);
    if (!ret.Item) {
      throw new Error(
        '[Controller][Product][getItem][Error] Item not found!'
      );
    }

    const item = new ProductModel(ret.Item);
    return item.toJson();
  }

  putItem = async (data) => {
    console.log('[Controller][Product][putItem] Start putItem');

    const params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        ppk: DATA_NAME,
        psk: `${data.appId}/${data.id}`,
        ...data
      }
    };

    const ret = await this.put(params);
    console.log(ret);

    return ret;
  }

  deleteItem = async (appId, productId) => {
    console.log('[Controller][Product][deleteItem] Start deleteItem');

    const params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        ppk: DATA_NAME,
        psk: `${appId}/${productId}`
      }
    };

    const ret = await this.delete(params);
    return ret;
  }

  queryItems = async (appId) => {
    console.log('[Controller][Product][queryItems] Start queryItems');

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
        ':id': `${appId}/`
      }
    };

    const ret = await this.query(params);
    console.log(ret);

    if (!ret.Items || ret.Items.length === 0) {
      throw new Error(
        '[Controller][Product][queryItems][Error] Items not found!'
      );
    }

    const items = ret.Items.map(item => {
      const product = new ProductModel(item);
      return product.toJson();
    });
    return items;
  }
};
