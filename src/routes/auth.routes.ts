import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Dummy users array to act as a database
let users: { email: string; password: string; name: string }[] = [];

// Generate JWT token
const generateToken = (user: { email: string }) => {
    return jwt.sign(user, 'your_jwt_secret', { expiresIn: '1h' });
};

// User registration
router.post('/register', [
    body('name').notEmpty().withMessage('Name is required.'),
    body('email').isEmail().withMessage('Email is invalid.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword, name });
    
    const token = generateToken({ email });
    res.status(201).json({ token });
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ email });
    res.status(200).json({ token });
});

// Current user endpoint
router.get('/current', (req, res) => {
    // In a real application, you'd extract the user from the token
    res.status(200).json({ user: users[0] }); // Placeholder for current user
});

export default router;