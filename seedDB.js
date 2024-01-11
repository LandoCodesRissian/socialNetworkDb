const mongoose = require('mongoose');
const { User, Thought, Reaction } = require('./models'); 

mongoose.connect('mongodb://127.0.0.1:27017/social-network');

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Thought.deleteMany();
    await Reaction.deleteMany();

    // Create users
    const user1 = await User.create({
      username: 'john_smith',
      email: 'john@example.com',
    });

    const user2 = await User.create({
      username: 'jane_smith',
      email: 'jane@example.com',
    });

    // Create thoughts
    const thought1 = await Thought.create({
      thoughtText: 'This is a cool thought!',
      username: user1.username,
    });

    const thought2 = await Thought.create({
      thoughtText: 'Another interesting thought!',
      username: user2.username,
    });

    // Create reactions
    await Reaction.create({
      reactionBody: 'Great thought!',
      username: user2.username,
      thought: thought1._id,
    });

    await Reaction.create({
      reactionBody: 'I agree!',
      username: user1.username,
      thought: thought2._id,
    });

    // log if seeding was successfull or not
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection after seeding
    mongoose.disconnect();
  }
};

seedDatabase();
