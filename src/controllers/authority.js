'use strict';
const AWS = require('aws-sdk');
const DynamoDB = require('../aws/dynamodb');
const AuthorityModel = require('../models/authority');

AWS.config.update({ region: process.env.REGION });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const DATA_NAME = 'authority';

module.exports = class Authority extends DynamoDB {
  constructor(client = docClient) {
    super(client);
  }

  getItem = async (appId, authorityId) => {
    console.log('[Controller][Authority][getItem] Start getItem');

    const params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        ppk: DATA_NAME,
        psk: `${appId}/${authorityId}`
      }
    };

    const ret = await this.get(params);
    if (!ret.Item) {
      console.error('[Controller][Authority][getItem][Error] Item not found!');
      throw new Error('Item not found!');
    }

    const item = new AuthorityModel(ret.Item);
    return item.toJson();
  }

  putItem = async (data) => {
    console.log('[Controller][Authority][putItem] Start putItem');

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

  deleteItem = async (appId, authorityId) => {
    console.log('[Controller][Authority][deleteItem] Start deleteItem');

    const params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        ppk: DATA_NAME,
        psk: `${appId}/${authorityId}`
      }
    };

    const ret = await this.delete(params);
    return ret;
  }

  queryItems = async (appId) => {
    console.log('[Controller][Authority][queryItems] Start queryItems');

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
      console.error('[Controller][Authority][queryItems][Error] Items not found!');
      throw new Error('Items not found!');
    }

    const items = ret.Items.map(item => {
      const product = new AuthorityModel(item);
      return product.toJson();
    });
    return items;
  }

  batchDeleteItems = async (appId, authorityIds) => {
    console.log('[Controller][Authority][batchDeleteItems] Start batch delete items');

    const requestItems = authorityIds.map(id => ({
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
    // if (ret.UnprocessedItems && ret.UnprocessedItems.[process.env.TABLE_NAME]) {
    //   let unprocItems = [];
    //   ret.UnprocessedItems.[process.env.TABLE_NAME].map(item => {
    //     if (item.DeleteRequest) {
    //       unprocItems.push(item.DeleteRequest);
    //     }
    //   });
    //   return unprocItems;
    // }

    // return [];
    return ret;
  }
};
