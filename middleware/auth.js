const jwt = require("jsonwebtoken");
const Auth = require('../models/auth');
const store = require("store2");

const config = process.env;

const verifyToken = async (req, res, next) => {
  const token = store('token');

  const result = await Auth.findOne({ token: token})
  if (!result) {
    return res.redirect('/signin?errormsg=addlisterror');
  }
  try {
    console.log(token)
    next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
 
};

module.exports = verifyToken;