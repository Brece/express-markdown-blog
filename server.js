const express = require('express');
const app = express();
const Article = require('./models/article');
const articleRouter = require('./routes/articles');

// database -------------------------------------
//Import the mongoose module
const mongoose = require('mongoose');

//Set up mongoose connection 
const dev_db_url = 'mongodb+srv://user:user123@cluster0.ayay7nr.mongodb.net/markdown_blog?retryWrites=true&w=majority';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// ----------------------------------------------

// view engine
app.set('view engine', 'ejs');

// Routes
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res, next) => {
    const articles = await Article.find().sort({ date: 'desc' });
    res.render('articles/index', { articles: articles });
});

app.use('/articles', articleRouter);

/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
*/

app.listen(3000);
