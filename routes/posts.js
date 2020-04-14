const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get all POSTS From DB and Display
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createAt: -1});
        // res.json(posts); 
        res.render('posts', {posts: posts});
    } catch (err) {
        console.log('Error getting posts: ', err);
    }
});

// Show New Post Page
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
       // res.json(newPost);
       res.redirect('/posts'); 
    } catch (err) {
        console.log('Error creating post: ', err);
    }
});

module.exports = router;
