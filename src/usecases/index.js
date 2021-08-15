const express = require('express');
const router = express.Router();
const Customer = require('./customer');
const Application = require('./application');
const CustomerApp = require('./customerApp');
const Product = require('./product');
const Authority = require('./authority');
const Plan = require('./plan');
const Group = require('./group');
const User = require('./user');
const Receipt = require('./receipt');

const customer = new Customer();
const application = new Application();
const customerApp = new CustomerApp();
const product = new Product();
const authority = new Authority();
const plan = new Plan();
const group = new Group();
const user = new User();
const receipt = new Receipt();

router.get('/', (req, res) => res.send('You succeed to access Receipt Bank!'));
// customer
router.get('/customer', customer.getItem);
router.post('/customer', customer.putItem);
router.delete('/customer', customer.deleteItem);
router.get('/customer/list', customer.queryItems);
// application
router.get('/application', application.getItem);
router.post('/application', application.putItem);
router.delete('/application', application.deleteItem);
// customerApp
router.get('/custoerapp', customerApp.getItem);
router.post('/customerapp', customerApp.putItem);
router.delete('/customerapp', customerApp.deleteItem);
router.get('/customerapp/list', customerApp.queryItems);
// product
router.get('/product', product.getItem);
router.post('/product', product.putItem);
router.delete('/product', product.deleteItem);
router.get('/product/list', product.queryItems);
// authority
router.get('/authority', authority.getItem);
router.post('/authority', authority.putItem);
router.delete('/authority', authority.deleteItem);
router.get('/authority/list', authority.queryItems);
// plan
router.get('/plan', plan.getItem);
router.post('/plan', plan.putItem);
router.delete('/plan', plan.deleteItem);
router.get('/plan/list', plan.queryItems);
// group
router.get('/group', group.getItem);
router.post('/group', group.putItem);
router.delete('/group', group.deleteItem);
router.get('/group/list', group.queryItems);
// user
router.get('/user', user.getItem);
router.post('/user', user.putItem);
router.get('/user/list', user.queryItems);
// receipt
router.get('/receipt', receipt.getItem);
router.post('/receipt', receipt.putItem);
router.delete('/receipt', receipt.deleteItem);
router.get('/receipt/list', receipt.queryItems);

module.exports = router;
