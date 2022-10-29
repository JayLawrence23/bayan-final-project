const express = require('express');

const { getHouses } = require('../controllers/house');

const router = express.Router();

router.get('/', getHouses);

module.exports = router;