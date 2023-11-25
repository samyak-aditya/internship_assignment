// src/controllers/taskController.js
import {Task} from '../models/modelSchema.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, assignedUser, dueDate } = req.body;

    // Create a new task
    const newTask = new Task({
      title,
      description,
      assignedUser,
      dueDate,
      completionStatus: false, // Assuming a new task is not completed by default
    });

    // Save the task to the database
    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const getAllTasks = async (req, res) => {
  try {
    // Retrieve all tasks from the database
    const tasks = await Task.find();

    res.json(tasks);
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getTaskById = async (req, res) => {
  try {
    // Retrieve a single task by ID from the database
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    // Check if the task with the provided ID exists
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error retrieving task by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const updateTask = async (req, res) => {
  try {
    // Retrieve task ID from the request parameters
    const taskId = req.params.id;

    // Check if the task with the provided ID exists
    const existingTask = await Task.findById(taskId);

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update task properties based on the request body
    existingTask.title = req.body.title || existingTask.title;
    existingTask.description = req.body.description || existingTask.description;
    existingTask.assignedUser = req.body.assignedUser || existingTask.assignedUser;
    existingTask.dueDate = req.body.dueDate || existingTask.dueDate;
    existingTask.completionStatus = req.body.completionStatus || existingTask.completionStatus;

    // Save the updated task to the database
    const updatedTask = await existingTask.save();

    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const deleteTask = async (req, res) => {
  try {
    // Retrieve task ID from the request parameters
    const taskId = req.params.id;

    // Use findByIdAndRemove to delete the task by ID
    const deletedTask = await Task.findByIdAndDelete(taskId);

    // Check if the task with the provided ID exists
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
