const express = require('express');
const app = express();

const articleRouter = require('./routes/articles');

// view engine
app.set('view engine', 'ejs');

// Routes
app.use('/articles', articleRouter);
app.get('/', (req, res, next) => {
    const articles = [
        {
            title: 'Test article 1',
            text: 'text',
            date: new Date(),
        },
        {
            title: 'Test article 2',
            text: 'text',
            date: new Date(),
        }
    ];
    res.render('index', { articles: articles });
});

app.listen(3000);
