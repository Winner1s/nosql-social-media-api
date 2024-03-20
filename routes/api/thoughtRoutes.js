const express = require('express');
const router = express.Router();

const { 
  getAllThoughts, 
  getThoughtById, 
  createThought, 
  updateThought, 
  deleteThought, 
  addReaction, 
  removeReaction } = 
  require('../../controllers/thoughtController');

// /api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);

// /api/thoughts/<thoughtId>
router
  .route('/:id') 
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/<thoughtId>/reactions
router
  .route('/:id/reactions') 
  .post(addReaction)
  .delete(removeReaction);

module.exports = router;