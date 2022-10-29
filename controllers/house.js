const mongoose = require('mongoose');
const House = require('../models/house');

module.exports = {
    getHouses: async(req, res) => {
        try {
            const house = await House.find({});
            res.render('index', { house }) 
        } catch (error) {
            console.log(error);
        }
    }
}