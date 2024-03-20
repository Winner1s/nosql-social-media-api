// ObjectId() method for converting studentId string into an ObjectId for querying database
const { User, Thought } = require('../models');
const { populate } = require('../models/User');

const thoughtController = {
  getAllThought(req, res) {
  Thought.find().then((thought) => res.json(thought)).catch((err) => res.status(500).json(err));

},

getAllThoughts(req, res) {
  Thought.find({})
  .populate({
    path: 'reactions',
    select: '-_v',
  })
    .select('-_v')
    .sort({ _id: -1})
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
  },

createThought(req, res) {
Thought.create(req.body)
.then((dbThoughtData) => {
return User.findOneAndUpdate(
{_id:req.body.userId},
{$push:{ thoughts:dbThoughtData._id}},
{new:true}
);
})

.then((dbThoughtData) => {
  if (!dbThoughtData) {
    res.status(404).json({ message: 'No user found with this id'});
  return;
}
res.json(dbThoughtData);
})
.catch((err) => res.status(500).json(err));
},

updateThought({params, body}, res) {
  Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
   .then(dbThoughtData => {
    if (!dbThoughtData) {
      res.status(404).json({ message: 'No thoughts found with that id!'});
      return;
    }
    res.json(dbThoughtData);
   })
   .catch(err => res.json(err));  
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
    .populate({
        path: 'reactions',
        select: '-__v' // Fixed the typo, exclude '__v' field
    })
    .select('-__v') // Exclude '__v' field
    .sort({ _id: -1 })
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought found with this ID' }); // Return the response to exit function
        }
        res.json(dbThoughtData);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' }); // Provide a generic error message for internal server errors
    });
},

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id})
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thoughts found with that id!'});
        return;
      }
      return User.findOneAndUpdate(
    { _id: params.userId },
    { $pull: { thoughts: params.Id }},
    { new: true }
    )
    })
  .then(dbUserData => {
    if(!dbUserData) {
      res.status(404).json({ message: 'No User found with this id!'});
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => res.json(err));
  },  

  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true } // Fixed the typo, set new: true
    )
    .populate({ path: 'reactions', select: '-__v' }) // '__v' instead of '_v'
    .select('-__v') // '__v' instead of '_v'
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought found with this ID.' }); // Changed status to 404 for not found
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.status(500).json(err)); // Changed status to 500 for internal server error
},

  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: {reactions: {reactionId: params.reactionId}}},
      {new: true }
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No!'});
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
  }
};

module.exports = thoughtController

