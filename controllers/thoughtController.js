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
        select: '-__v' 
    })
    .select('-__v') 
    .sort({ _id: -1 })
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought found with this ID' }); 
        }
        res.json(dbThoughtData);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' }); 
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
        { _id: params.id},
        { $push: { reactions: body } },
        { new: true, runValidators: true } 
    )
    .populate({ path: 'reactions', select: '-__v' }) 
    .select('-__v') 
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought found with this ID.' }); 
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.status(500).json(err)); 
},

  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
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

