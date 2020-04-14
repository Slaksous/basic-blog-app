const mongoose = require('mongoose');

const postSchema =  mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,

        default: Date.now
    }
});

const Post = mongoose.model('post', postSchema);

module.exports = Post;