const { Thought, User } = require("../models");

const userController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create user
  createUser: async (req, res) => {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update user by id
  updateUser: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete user
  deleteUser: async (req, res) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.id });

      if (!user) {
        return res.status(404).json({ message: 'No user found' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });

      res.json({ message: 'User and associated thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get user by id
  getUserById: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });

      if (!user) {
        return res.status(404).json({ message: 'No user found' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add friend
  addFriend: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId }, // Change req.params.id to req.params.userId
        { $addToSet: { friends: req.params.friendId } }, // Change req.params.friendsId to req.params.friendId
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' }); // Update the error message
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Remove friend
  removeFriend: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendsId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No friend found with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

module.exports = userController;