const express = require('express');

const { 
    getHouses,
    createHouse,
    getHouse,
    addReview
 } = require('../controllers/house');

const router = express.Router();

router.get('/', getHouses);
router.post('/new', createHouse);
router.get('/:id', getHouse);
router.post('/:id/addreview', addReview);

module.exports = router;