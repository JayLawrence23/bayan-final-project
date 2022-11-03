const Auth = require('../models/auth');
const Listing = require('../models/listing');

const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

module.exports = {
    // To view all listings
    signIn: async(req, res) => {
        const { username, password } = req.body;

        try {
            const existingUser = await Auth.findOne({ username: username });
  
            if(!existingUser) return res.redirect('/signin?errormsg=doesntexist');
           
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

            if(!isPasswordCorrect) return res.redirect('/signin?errormsg=invalid')

            const token = jwt.sign(
                { user_id: existingUser._id },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "5h",
                }
            );
            const listing = await Listing.find({});
            
            console.log(token);
   
            res.render('index', { username: username, listing });
        } catch (error) {
            console.log(error);
        }
    },
    signUp: async(req, res) => {
        const { username, password } = req.body;
        
        try {
            const existingUser = await Auth.findOne({ username: username });
    
            if(existingUser) return res.redirect('/signin?errormsg=alreadyexist');
    
            const hashedPassword = await bcrypt.hash(password, 12);
    
            const result = await Auth.create({ username: username, password: hashedPassword});
            const listing = await Listing.find({});
    
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "5h",
                }
            );

            console.log(token);
            res.render('index', { username: username, listing });
        } catch (error) {
            res.status(500).json( {message: "Something went wrong. "});
        }
    }
}