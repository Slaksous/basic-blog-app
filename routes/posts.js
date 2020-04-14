const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get all POSTS From DB and Display
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createAt: -1});
        res.render('posts', {posts: posts});
    } catch (err) {
        console.log('Error getting posts: ', err);
    }
});

// New Post Form
router.get('/new', (req, res) => {
    res.render('post');
});

// Create New Post in DB and redirect to Posts Page
router.post('/', async (req, res) => {
    const post = new Post({
        author: req.body.author,
        text: req.body.text
    });

    try {
       const newPost = await post.save();
       res.redirect('/posts'); 
    } catch (err) {
        console.log('Error creating post: ', err);
    }
});

// Delete Post Route
router.delete('/:id', async (req, res) => {
    let post;
    try {
        post = await Post.findById(req.params.id);
        await post.remove();
        res.redirect('/posts');
    } catch (err) {
        console.log('Error deleting post: ', err);
    } 
});

module.exports = router;
