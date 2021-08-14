const express = require('express');
const router = express.Router();
const customer = require('./customer');

const Customer = new customer();

router.get('/', (req, res) => res.send('You succeed to access Receipt Bank!'));
// customer
router.get('/customer', Customer.getItem);
router.post('/customer', Customer.putItem);
router.delete('/customer', Customer.deleteItem);

module.exports = router;
