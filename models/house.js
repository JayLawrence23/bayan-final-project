const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
    housename: { type: String, required: true },
    username: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    date:  { type : Date, default: Date.now },
    address: { type: String, required: true },
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

const House = mongoose.model('House', houseSchema);

module.exports = House;