const express = require("express");
const app = express();
const PORT = process.env.PORT || 5050;
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const dotenv = require('dotenv')
const ejsMate = require('ejs-mate')

// Routes
const listingRoutes = require('./routes/listing');

const Listing = require('./models/listing')
const cities = require('./seeds/cities')

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);

// design file
app.use(express.static(path.join(__dirname, '/public')))

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

// to view all listings
app.get('/', async (req, res) => {
    try {
        const listing = await Listing.find({});
        res.render('index', { listing }) 
    } catch (error) {
        console.log(error);
    }
})
// router of web pages
app.get('/l/new', (req, res) => { 
    res.render('listings/new', { cities }); 
})

// routers
app.use('/l', listingRoutes);

// Redirect to specific listing
app.get('/a/:listing', (req, res) => {
  const { listing } = req.params;
  if(data){
      res.render('subreddit', { ...data });
  } else {
      res.render('notfound');
  }
})

// server listening
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error));
