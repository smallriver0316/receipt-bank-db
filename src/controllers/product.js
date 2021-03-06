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
      console.error('[Controller][Product][getItem][Error] Item not found!');
      throw new Error('Item not found!');
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

  queryItems = async (appId, storeName='') => {
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
      console.error('[Controller][Product][queryItems][Error] Items not found!');
      throw new Error('Items not found!');
    }

    let items = [];
    ret.Items.forEach(item => {
      const product = new ProductModel(item);
      if (storeName === '') {
        items.push(product.toJson());
      } else if (storeName === product.Store) {
        items.push(product.toJson());
      }
    });

    return items;
  }

  batchDeleteItems = async (appId, productIds) => {
    console.log('[Controller][Product][batchDeleteItems] Start batch delete items');

    const requestItems = productIds.map(id => ({
      DeleteRequest: {
        Key: {
          ppk: DATA_NAME,
          psk: `${appId}/${id}`
        }
      }
    }));
    const params = {
      RequestItems: {
        [process.env.TABLE_NAME]: requestItems
      }
    };

    const ret = await this.batchWriteItems(params);
    console.log(ret);

    if (ret.UnprocessedItems && Object.keys(ret.UnprocessedItems).length > 0) {
      console.error('[Controller][Product][batchDeleteItems] Failed to delete items');
      throw new Error('Failed to delete items');
    }

    return ret;
  }
};
