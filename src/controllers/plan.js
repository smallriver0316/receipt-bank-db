'use strict';
const AWS = require('aws-sdk');
const DynamoDB = require('../aws/dynamodb');
const PlanModel = require('../models/plan');

AWS.config.update({ region: process.env.REGION });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const DATA_NAME = 'plan';

module.exports = class Plan extends DynamoDB {
  constructor(client = docClient) {
    super(client);
  }

  getItem = async (appId, planId) => {
    console.log('[Controller][Plan][getItem] Start getItem');

    const params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        ppk: DATA_NAME,
        psk: `${appId}/${planId}`
      }
    };

    const ret = await this.get(params);
    if (!ret.Item) {
      console.error('[Controller][Plan][getItem][Error] Item not found!');
      throw new Error('Item not found!');
    }

    const item = new PlanModel(ret.Item);
    return item.toJson();
  }

  putItem = async (data) => {
    console.log('[Controller][Plan][putItem] Start putItem');

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

  deleteItem = async (appId, planId) => {
    console.log('[Controller][Plan][deleteItem] Start deleteItem');

    const params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        ppk: DATA_NAME,
        psk: `${appId}/${planId}`
      }
    };

    const ret = await this.delete(params);
    return ret;
  }

  queryItems = async (appId) => {
    console.log('[Controller][Plan][queryItems] Start queryItems');

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
      console.error('[Controller][Plan][queryItems][Error] Items not found!');
      throw new Error('Items not found!');
    }

    const items = ret.Items.map(item => {
      const plan = new PlanModel(item);
      return plan.toJson();
    });
    return items;
  }
};
