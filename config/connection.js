const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/social-network';

mongoose.connect(mongoURI);

const connection = mongoose.connection;

connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

connection.once('open', () => {
  console.log('MongoDB connected successfully');
});

module.exports = connection;
