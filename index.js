// index.js
import express from 'express';
import mongoose from 'mongoose';
import router from './routes/routes.js';

const app = express();
const port = 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://Samyak:Cyber10@cluster0.t5hemdi.mongodb.net/?retryWrites=true&w=majority', {
  
  
});

// Check MongoDB connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
app.use(express.json());
// Set up basic route
app.use('/', router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
