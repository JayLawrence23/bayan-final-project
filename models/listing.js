const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    date:  { type : Date, default: Date.now },
    location: { type: String, required: true },
    img: { type: String },
    guest: { type: Number, required: true, min: 0 },
    review: [
        {
            review_author: { type: String, required: true },
            review: { type: String, required: true },
            rate: { type: Number },
            date: { type : Date, default: Date.now },
        }
    ]
})

const listing = mongoose.model('Listing', listingSchema);

module.exports = listing;