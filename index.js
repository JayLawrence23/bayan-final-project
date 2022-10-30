const express = require("express");
const app = express();
const PORT = process.env.PORT || 5050;
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const dotenv = require('dotenv')

const houseRoutes = require('./routes/house');

const House = require('./models/house')

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// design file
app.use(express.static(path.join(__dirname, '/public')))

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

// to view all listings
app.get('/', async (req, res) => {
    try {
        const house = await House.find({});
        res.render('index', { house }) 
    } catch (error) {
        console.log(error);
    }
})

app.get('/new', (req, res) => {
    res.render('houses/new');
})

// routers
app.use('/houses', houseRoutes);

// Redirect to specific house
app.get('/a/:listing', (req, res) => {
  const { listing } = req.params;
  if(data){
      res.render('subreddit', { ...data });
  } else {
      res.render('notfound');
  }
})

// add new house
app.post('/listhouse', (req, res) => {
  console.log(req.body);
  res.redirect('/list');
})


// server listening
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error));
