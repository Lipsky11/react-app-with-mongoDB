const mongoose = require("mongoose");

const connectDb = () => {
  return mongoose.connect("mongodb://mongo:27017/users");
};

module.exports = connectDb;
