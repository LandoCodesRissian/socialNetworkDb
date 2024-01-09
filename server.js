const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const thoughtRoutes = require('./routes/thoughts');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/social-network');

// routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

// Console.log telling user what server we are running off of
app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});
