const Admin = require('../Models/Admin');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !name.trim() || !email || !email.trim() || !password || !password.trim()) {
      return res.status(400).json({ error: 'All fields are required and cannot be empty.' });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const newAdmin = new Admin({
      name: name.trim(),
      email: email.trim(),
      password: password.trim()
    });

    const savedAdmin = await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully', admin: savedAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !email.trim() || !password || !password.trim()) {
      return res.status(400).json({ error: 'Email and password are required and cannot be empty.' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
};
