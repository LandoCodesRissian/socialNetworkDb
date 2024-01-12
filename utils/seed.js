const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');
const {getRandomName, getRandomEmail} = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Delete the collections if they exist
  await Promise.all([
    connection.dropCollection('users').catch((err) => console.log(err)),
    connection.dropCollection('thoughts').catch((err) => console.log(err)),
    connection.dropCollection('reactions').catch((err) => console.log(err)),
  ]);

  // Create empty array to hold the users
  const users = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {
    const fullName = getRandomName();
    const username = fullName.replace(/\s+/g, '').toLowerCase();
    const email = getRandomEmail();

    users.push({
      username,
      fullName,
      email,
    });
  }

  // Add users to the collection and await the results
  const userData = await User.insertMany(users);

  // Create empty array to hold the thoughts
  const thoughts = [];

  // Loop 20 times -- add thoughts to the thoughts array
  for (let i = 0; i < 20; i++) {
    const randomUser = userData[Math.floor(Math.random() * userData.length)]._id;

    thoughts.push({
      thoughtText: `This is thought ${i + 1}`,
      user: randomUser,
    });
  }

  // Add thoughts to the collection and await the results
  const thoughtData = await Thought.insertMany(thoughts);

  // Create empty array to hold the reactions
  const reactions = [];

  // Loop 20 times -- add reactions to the reactions array
  for (let i = 0; i < 20; i++) {
    const randomThought = thoughtData[Math.floor(Math.random() * thoughtData.length)]._id;

    reactions.push({
      reactionBody: `This is reaction ${i + 1}`,
      username: getRandomName(),
      thought: randomThought,
    });
  }

  // Add reactions to the collection and await the results
  await Reaction.insertMany(reactions);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.table(reactions);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
