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
const uri = 'mongodb://localhost:27017/demo-blog-app';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', error => console.error('Mongoose Error: ', error));
db.once('open', () => console.log('Mongoose is connected!'));

app.get('/', (req, res) => {
    res.send('Hello World from INDEX PAGE');
});

app.use('/posts', postsRoute);

app.listen(3000, () => {
    console.log('Server listening on port 3000...');
});

