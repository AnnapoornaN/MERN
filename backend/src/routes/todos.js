const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// Create a new todo
router.post('/', async (req, res) => {
  const { text } = req.body;

  try {
    const newTodo = new Todo({ text });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Update a todo's completed status
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, { completed: req.body.completed }, { new: true }); // Ensure updated document is returned

    if (!updatedTodo) {
      return res.status(404).send('Todo not found');
    }

    res.json(updatedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).send('Todo not found');
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
