const names = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Emma',
    'Frank',
    'Grace',
    'Henry',
    'Ivy',
    'Jack',
    'Katherine',
    'Liam',
    'Mia',
    'Nathan',
    'Olivia',
    'Parker',
    'Quinn',
    'Ryan',
    'Sophia',
    'Thomas',
    'Ursula',
    'Victor',
    'Willow',
    'Xander',
    'Yasmine',
    'Zane',
  ];
  
  // Sample thought texts
  const thoughtTexts = [
    'Just had an amazing dinner with friends!',
    'Started a new project today. Excited about it!',
    'Watching the sunset by the beach. So peaceful.',
    'Visited a new coffee shop. Their lattes are fantastic!',
    'Reading a great book. Highly recommend!',
    'Coding all night. #Hackathon',
    'Planning a road trip for the weekend. Any suggestions?',
    'Attended a virtual meetup. Met interesting people!',
    'Reached a personal milestone today. Feeling accomplished!',
    'Trying out a new recipe. Hope it turns out well!',
    'Exploring new hiking trails. Nature therapy!',
  ];
  const reactionData = [
    "hello",
    "goodbye",
    "touchdown",
    "why did saban retire",
    "really!",
    "if you say so",
    "whatever",
    "situationship",
    "come on now",
    "coding",
  ];
  
  const users = [];
  
  // Get a random item given an array
  const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  // Gets a random user name
  const getRandomUserName = () =>
    `${getRandomArrItem(names)}${getRandomArrItem(names)}`;
  
  // Gets a random thought
  const getRandomThought = () => `${getRandomArrItem(thoughtData)}`;
  
  // Gets a random reaction
  const getRandomReaction = () => `${getRandomArrItem(reactionData)}`;
  
  // Export the functions for use in seed.js
  module.exports = {
    getRandomUserName,
    getRandomThought,
    getRandomReaction,
  };
  