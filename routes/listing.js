const express = require('express');


const { 
    getListings,
    createListing,
    getListing,
    addReview,
    routeEdit,
    editListing,
    deleteListing
 } = require('../controllers/listing');

const router = express.Router();

router.get('/', getListings);
router.post('/new', createListing);
router.get('/:id', getListing);
router.post('/:id/addreview', addReview);
router.get('/:id/edit', routeEdit);
router.put('/:id', editListing);
router.delete('/:id/delete', deleteListing);

module.exports = router;