const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');
const { deleteReaction } = require('../../controllers/thoughtcontroller');

// /api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);

// /api/thoughts/<thoughtId>
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/<thoughtId>/reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction)
  .delete(removeReaction);

module.exports = router;