const express = require('express');
const router = express.Router();
const customer = require('./customer');

const Customer = new customer();

router.get('/', (req, res) => res.send('You succeed to access Receipt Bank!'));
router.get('/customer', Customer.get);

module.exports = router;
