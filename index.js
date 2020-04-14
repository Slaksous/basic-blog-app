const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const methodOverride =require('method-override');
const postsRoute = require('./routes/posts');
const mongoose   = require('mongoose');

app.set('view engine', 'ejs');
app.use(express.json({extended: false}));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// DB Setup
// const uri = 'mongodb://localhost:27017/demo-blog-app';
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', error => console.error('Mongoose Error: ', error));
db.once('open', () => console.log('Mongoose is connected!'));

app.get('/', (req, res) => {
    res.render('posts');
});

app.use('/posts', postsRoute);

app.listen(process.env.PORT || 3000);
