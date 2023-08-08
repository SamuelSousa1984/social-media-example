const Post = require('../models/Post');
const { validationResult } = require('express-validator');

exports.getPost = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'username')
            .sort({createdAt: -1})
        res.json(posts);
    }
    catch(error) {
        res.status(500).json({ error: 'Failed to fetch posts' })
    }
};
exports.createPost = async (req, res) => {
    try {
        const newPost = new Post(req.body);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        await newPost.save();
        res.json(newPost);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create a post' });
    }
}