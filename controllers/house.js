const House = require('../models/house');
const { randImage } = require('./randomImage');
const timeAgo = require('timeago.js');

module.exports = {
    getHouses: async(req, res) => {
        try {
            const house = await House.find({});
            res.render('index', { house }) 
        } catch (error) {
            console.log(error);
        }
    },
    createHouse: async(req, res) => {
        const inputs = req.body;        

        try {
            
            const house = await House.create({ 
                ...inputs,
                img: randImage(),
                username: "Jay"
            });
            res.redirect(`${house._id}`) 
        } catch (error) {
            console.log(error);
        }
    },
    getHouse: async(req, res) => {
        const { id } = req.params;
        try {
            const house = await House.findById(id);
            const reviewtime = timeAgo.format(house.review.date);
            res.render('houses/house', { house, reviewTime: reviewtime }) 
        } catch (error) {
            console.log(error);
        }
    },
    addReview: async(req, res) => {
        const { id } = req.params;
        const { review } = req.body; // to add rate
        const rev = await House.findById(id);
        rev.review.push({ review_author: "Jay", review: review, rate: 5.00 });
        await House.findByIdAndUpdate(id, rev, { new: true });
        res.redirect(`/houses/${rev._id}`);
    },
}