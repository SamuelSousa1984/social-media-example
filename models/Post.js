const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: String,
    createdAt: { type: Date, default: Date.now},
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;