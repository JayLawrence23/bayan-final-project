const express = require("express");
const app = express();
const PORT = process.env.PORT || 5050;
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const dotenv = require('dotenv')
const ejsMate = require('ejs-mate')
const store = require("store2");

// Routes
const listingRoutes = require('./routes/listing');
const authRoutes = require('./routes/auth');

// middleware
const auth = require('./middleware/auth');

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
        if(store('token')){
            res.render('index', { listing }) 
        }
        else {
            res.render('index', { listing }) 
        }
    } catch (error) {
        console.log(error);
    }
})
// router of web pages
app.get('/l/new', auth, (req, res) => { 
    res.render('listings/new', { cities }); 
})
app.get('/signin', (req, res) => { 
    const { errormsg } = req.query;
    let message;
    if(errormsg === "doesntexist") {
        message = "User doesn't exist.";
    } else if (errormsg === "addlisterror") {
        message = "Need to Sign In first to be able to add a listing."
    } else if(errormsg === "invalid") {
        message = "Invalid credentials."
    } else if(errormsg === "alreadyexist") {
        message = "User already exist.";
    } else {
        message = null;
    }

    res.render('signin', { message: message || null, messageClass: null }); 
})

app.get('/signup', (req, res) => { 
    res.render('signup', { message: null, messageClass: null }); 
})


// routers
app.use('/l', listingRoutes);
app.use('/a', authRoutes);

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
