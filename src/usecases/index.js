const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('You succeed to access Receipt Bank!'));

module.exports = router;
