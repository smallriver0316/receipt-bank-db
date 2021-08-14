'use strict';
const AWS = require('aws-sdk');
const DynamoDB = require('../aws/dynamodb');
const GroupModel = require('../models/group');

AWS.config.update({ region: process.env.REGION });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const DATA_NAME = 'group';

module.exports = class Group extends DynamoDB {
  constructor(client = docClient) {
    super(client);
  }

  getItem = async (appId, planId, groupId) => {
    console.log('[Controller][Group][getItem] Start getItem');

    const params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        ppk: DATA_NAME,
        psk: `${appId}/${planId}/${groupId}`
      }
    };

    const ret = await this.get(params);
    if (!ret.Item) {
      throw new Error(
        '[Controller][Group][getItem][Error] Item not found!'
      );
    }

    const item = new GroupModel(ret.Item);
    return item.toJson();
  }

  putItem = async (data) => {
    console.log('[Controller][Group][putItem] Start putItem');

    const params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        ppk: DATA_NAME,
        psk: `${data.appId}/${data.planId}/${data.id}`,
        ...data
      }
    };

    const ret = await this.put(params);
    console.log(ret);

    return ret;
  }

  deleteItem = async (appId, planId, groupId) => {
    console.log('[Controller][Group][deleteItem] Start deleteItem');

    const params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        ppk: DATA_NAME,
        psk: `${appId}/${planId}/${groupId}`
      }
    };

    const ret = await this.delete(params);
    return ret;
  }

  queryItems = async (appId, planId) => {
    console.log('[Controller][Group][queryItems] Start queryItems');

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
        ':id': `${appId}/${planId}/`
      }
    };

    const ret = await this.query(params);
    console.log(ret);

    if (!ret.Items || ret.Items.length === 0) {
      throw new Error(
        '[Controller][Group][queryItems][Error] Items not found!'
      );
    }

    const items = ret.Items.map(item => {
      const product = new GroupModel(item);
      return product.toJson();
    });
    return items;
  }
};
