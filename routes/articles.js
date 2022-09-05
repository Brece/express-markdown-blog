const express = require('express');
const router = express.Router();
const Article = require('./../models/article');

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() });
});

router.get('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);

        if (article == null) {
            res.redirect('/');
        }

        res.render('articles/show', { article: article });
    } catch (err) {

    }
});

router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    });
    try {
        article = await article.save();
        res.redirect(`/articles/${article.id}`);
    } catch (err) {
        console.log(err);
        res.render('articles/new', { article: article })
    }
});

module.exports = router;
