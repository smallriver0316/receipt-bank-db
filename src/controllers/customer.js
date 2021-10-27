'use strict';
const AWS = require('aws-sdk');
const DynamoDB = require('../aws/dynamodb');
const CustomerModel = require('../models/customer');

AWS.config.update({ region: process.env.REGION });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const DATA_NAME = 'customer';

module.exports = class Customer extends DynamoDB {
  constructor(client = docClient) {
    super(client);
  }

  getItem = async (id) => {
    console.log('[Controller][Customer][getItem] Start getItem');

    const params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        ppk: DATA_NAME,
        psk: id
      }
    };

    const ret = await this.get(params);
    if (!ret.Item) {
      console.error('[Controller][Customer][getItem][Error] Item not found!');
      throw new Error('Item not found!');
    }

    const item = new CustomerModel(ret.Item);
    return item.toJson();
  }

  putItem = async (data) => {
    console.log('[Controller][Customer][getItem] Start putItem');

    const params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        ppk: DATA_NAME,
        psk: data.id,
        gsi1pk: DATA_NAME,
        gsi1sk: data.email,
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
      TableName: process.env.TABLE_NAME,
      Key: {
        ppk: DATA_NAME,
        psk: id
      }
    };

    const ret = await this.delete(params);
    return ret;
  }

  queryItems = async () => {
    console.log('[Controller][Customer][queryItems] Start queryItems');

    const params = {
      TableName: process.env.TABLE_NAME,
      KeyConditionExpression: '#PartitionKey=:data',
      ExpressionAttributeNames: {
        '#PartitionKey': 'ppk'
      },
      ExpressionAttributeValues: {
        ':data': DATA_NAME
      }
    };

    const ret = await this.query(params);
    console.log(ret);

    if (!ret.Items || ret.Items.length == 0) {
      console.error('[Controller][Customer][queryItems][Error] Items not found!');
      throw new Error('Items not found!');
    }

    const items = ret.Items.map(item => {
      const customer = new CustomerModel(item);
      return customer.toJson();
    });
    return items;
  }

  getItemByEmail = async (email) => {
    console.log('[Controller][Customer][getItemByEmail] Start getItem by Email');

    const params = {
      TableName: process.env.TABLE_NAME,
      IndexName: 'GSI1',
      KeyConditionExpression: '#PartitionKey=:data and #SortKey=:email',
      ExpressionAttributeNames: {
        '#PartitionKey': 'gsi1pk',
        '#SortKey': 'gsi1sk'
      },
      ExpressionAttributeValues: {
        ':data': DATA_NAME,
        ':email': email
      }
    };

    const ret = await this.query(params);
    console.log(ret);

    if (!ret.Items || ret.Items.length === 0) {
      console.error('[Controller][Customer][getItemByEmail][Error] Items not found!');
      throw new Error('Items not found!');
    }
    if (ret.Items.length > 1) {
      console.error('[Controller][Customer][getItemByEmail][Error] Items duplicated!');
      throw new Error('Items duplicated!');
    }

    const item = new CustomerModel(ret.Items[0]);
    return item.toJson();
  }
};
