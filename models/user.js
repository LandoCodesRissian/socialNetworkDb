const mongoose = require('mongoose');
// Create the userSchema 
const userSchema = new mongoose.Schema({
    // userSchema username information
    username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
},
    // userSchema email information
    email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match a valid email address'],
    },
    // userSchema "thoughts"(post) information
    thoughts: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thought',
    },
],
    // userSchema friends information
    friends: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    },
],
});
// get length of friend count and return it for the amount of friends
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
// Prepare for exporting of user model
const User = mongoose.model('User', userSchema);
// Exporting user model
module.exports = User;