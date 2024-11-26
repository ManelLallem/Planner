const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/plannerUser');

exports.signup = async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;
  
    // Check if any required field is missing
    if (!firstName || !lastName || !username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the user with all required fields
      const user = await User.create({ firstName, lastName, username, email, password: hashedPassword });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
    }
  };

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET);
    res.send({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
};
exports.getUserData = async (req, res) => {
  try {
    console.log("loading the data from the back");
    const { userId } = req.params; 
    const user = await User.findById(userId).select('-password'); 
    if (user) {
      res.send(user); 
      console.log("User found");
    } else {
      res.status(404).send('User not found'); 
      console.log("User not found");
    }
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).send('Server error');
  }
};

