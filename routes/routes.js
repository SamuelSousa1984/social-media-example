const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middleware/jwtMiddleware');
const uploadMiddleware = require('../middleware/uploadsMiddleware');
const userController = require('../controllers/userControllers');
const postController = require('../controllers/postController');

const { body } = require('express-validator');

router.get('/users', jwtMiddleware, userController.getUsers);
router.post('/users', [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid e-mail'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
],
jwtMiddleware, userController.createUsers);

router.get('/posts', jwtMiddleware, postController.getPost);
router.post('/posts', jwtMiddleware, [
    body('content').isEmpty().withMessage(`You can't post it empty`)
], postController.createPost);

router.post('/upload', uploadMiddleware.single('image'), (req, res) => {
    try {
        const imageUrl = '/uploads/' + req.file.filename;
        res.json({ imageUrl });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload image' });
    }
})

module.exports = router;