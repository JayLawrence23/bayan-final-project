const mongoose = require('mongoose');
const Listing = require('../models/listing');
const cities = require('./cities')
const { randImage } = require('../controllers/randomImage');
const seedHelpers = require('./seedHelpers');

mongoose.connect('mongodb+srv://jaylawrence:7sdM0DWZeln5Ufb1@movieapp.qqetypl.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log("DB CONNECTED @4040");
})
.catch(err => {
    console.log("Error");
    console.log(err)
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
    await Listing.deleteMany({});
    for(let i = 0; i <= 8; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const list = new Listing({
            location: `${cities[random1000].city}, ${cities[random1000].admin_name}`,
            name: `${sample(seedHelpers.descriptors)} ${sample(seedHelpers.places)}`,
            img: randImage(),
            desc: 'Lorem ipsip dolor ist amet const grr arohrpa hrehapps0 pbprahreay',
            price: 5666,
            username: "Jay",
            guest: 4
        })
        await list.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
});