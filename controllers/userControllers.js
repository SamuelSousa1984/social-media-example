const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator')

exports.loginUsers = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if ( !user || user.password ==! password) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        const token = jwt.sign({userID: user._id}, 'your-secred-key',
            {expiresIn: '3d'}
        );

        res.json({ token })
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
}

exports.getUsers = async (_req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}

exports.createUsers = async (req, res) => {
    try {
        const {password, ...userData} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newUser = new User({...userData, password: hashedPassword});
        await newUser.save();
        res.json(newUser);  
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create a user' });
    }
}