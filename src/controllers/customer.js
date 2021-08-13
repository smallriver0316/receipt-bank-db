'use strict';
const AWS = require('aws-sdk');
const DynamoDB = require('../aws/dynamodb');

AWS.config.update({ region: process.env.REGION });

const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

module.exports = class Customer extends DynamoDB {
  constructor(client = docClient) {
    super(client);
  }
};
