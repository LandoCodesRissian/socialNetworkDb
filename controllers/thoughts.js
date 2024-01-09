const Thought = require('../models/thought');
const Reaction = require('../models/reaction');

// Get all thoughts
const getAllThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Get thought by ID with associated reactions
const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id).populate('reactions');
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Create a new thought
const createThought = async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        // Associate the new thought with the user
        const user = await User.findOne({ username: newThought.username });
        if (user) {
            user.thoughts.push(newThought._id);
            await user.save();
        }
        res.json(newThought);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Update a thought by ID
const updateThought = async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedThought);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Delete a thought by ID
const deleteThought = async (req, res) => {
    try {
        const deletedThought = await Thought.findByIdAndDelete(req.params.id);
        res.json(deletedThought);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Create a new reaction for a thought
const createReaction = async (req, res) => {
    try {
        const { thoughtId } = req.params;
        const thought = await Thought.findById(thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        const newReaction = await Reaction.create(req.body);
        thought.reactions.push(newReaction._id);
        await thought.save();
        res.json(newReaction);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Delete a reaction for a thought
const deleteReaction = async (req, res) => {
    try {
        const { thoughtId, reactionId } = req.params;
        const thought = await Thought.findById(thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        // Remove the reaction ID from the thought's reactions array
        thought.reactions.pull(reactionId);
        await thought.save();
        // Delete the reaction
        const deletedReaction = await Reaction.findByIdAndDelete(reactionId);
        res.json(deletedReaction);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Export all functions for routing
module.exports = {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
};
