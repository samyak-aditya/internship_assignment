// src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';


const { secret } = 'jwtConfig';

// Add the 'function' keyword to define the function
const authMiddleware = (req, res, next) => {
  // Get the token from the request header
  const authHeader = req.header('Authorization');

  // Check if the token is present
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized - Token not provided' });
  }

  // Check if the token starts with 'Bearer '
  const tokenParts = authHeader.split(' ');

  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Unauthorized - Invalid token format' });
  }

  const token = tokenParts[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded.user; // Attach the user to the request for future use
    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

export default authMiddleware; // Export the middleware function
