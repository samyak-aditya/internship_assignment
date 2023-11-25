// src/routes/taskRoutes.js
import express from 'express';
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from '../controllers/task.js';
import authMiddleware from '../middleware/auth.js';

import { login, signup } from '../controllers/users.js';

const router = express.Router();



// Routes for tasks
router.post('/createTask',authMiddleware, createTask);
router.get('/task',authMiddleware, getAllTasks);
router.get('/task/:id',authMiddleware, getTaskById);
router.put('/task/:id',authMiddleware, updateTask);
router.delete('/task/:id',authMiddleware, deleteTask);
router.post('/login', login);
router.post('/signup', signup);

export default router;

