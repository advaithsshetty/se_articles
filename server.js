const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { addArticle, searchArticles, getArticle, getArticles, deleteArticle } = require('./articles');

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/articles', (req, res) => {
    const { title, content, tags } = req.body;
    const article = addArticle(title, content, tags);
    res.status(201).json(article);
});

app.get('/articles', (req, res) => {
    articles = getArticles();
    res.json(articles);
});

app.get('/articles/search', (req, res) => {
    var { query, sortBy } = req.query;
    if (!query) {
        res.status(400).send('Missing query parameter');
        return;
    }
    if (!sortBy) {
        sortBy = 'relevance';
    }
    const results = searchArticles(query, sortBy);
    res.json(results);
});

app.get('/articles/:id', (req, res) => {
    const article = getArticle(req.params.id);
    if (article) {
        res.json(article);
    } else {
        res.status(404).send('Article not found');
    }
});

app.delete('/articles/:id', (req, res) => {
    const article = deleteArticle(req.params.id);
    if (article) {
        res.json(article);
    }
    else {
        res.status(404).send('Article not found');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
