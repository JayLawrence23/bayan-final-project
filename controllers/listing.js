const Listing = require('../models/listing');
const { randImage } = require('./randomImage');
const cities = require('../seeds/cities');
const moment = require('moment');

module.exports = {
    // To view all listings
    getListings: async(req, res) => {
        try {
            const listing = await Listing.find({});
            res.render('index', { listing }) 
        } catch (error) {
            console.log(error);
        }
    },
    // To create a new listing
    createListing: async(req, res) => {
        const inputs = req.body;        

        try {
            
            const listing = await Listing.create({ 
                ...inputs,
                img: randImage(),
                username: "Jay"
            });
            res.redirect(`${listing._id}`) 
        } catch (error) {
            console.log(error);
        }
    },
    // To view specific listing
    getListing: async(req, res) => {
        const { id } = req.params;
        try {
            const listing = await Listing.findById(id);
            res.render('listings/listing', { listing, moment: moment }) 
        } catch (error) {
            console.log(error);
        }
    },
    // To add review
    addReview: async(req, res) => {
        const { id } = req.params;
        const { review, rate } = req.body; // to add rate
        const rev = await Listing.findById(id);
        console.log(rate)
        rev.review.push({ review_author: "Jay", review: review, rate: rate });
        await Listing.findByIdAndUpdate(id, rev, { new: true });
        res.redirect(`/l/${rev._id}`);
    },
    // To redirect to edit form
    routeEdit: async (req, res) => {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        res.render('listings/edit', { listing, cities });
    },
    // To edit a specific listing
    editListing: async (req, res) => {
        const { id } = req.params;
        const { name, desc, location, guest, price } = req.body;
        const result = await Listing.findByIdAndUpdate(id, { 
            name: name.trim(), 
            desc: desc.trim(), 
            location: location, 
            guest: guest, 
            price: price }, { new: true })
        res.redirect(`/l/${id}`);
    },
    // To delete the listing
    deleteListing: async (req, res) => {
        const { id } = req.params;
        await Listing.findByIdAndDelete(id);
        res.redirect(`/`);
    }
    
}