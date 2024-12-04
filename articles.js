const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { calculateRelevance } = require('./utils');

const articlesFilePath = path.join(__dirname, 'data', 'articles.json');

let articles = [];
let index = {};

const loadArticles = () => {
    try {
        const data = fs.readFileSync(articlesFilePath);
        const parsedData = JSON.parse(data);
        articles = parsedData.articles || [];
        index = parsedData.index || {};
    } catch (error) {
        console.log('Error loading articles from file, starting fresh...');
        articles = [];
        index = {};
    }
};

const deleteArticle = (id) => {
    const article = getArticle(id);
    if (article) {
        articles = articles.filter(article => article.id !== id);

        const keywords = [...article.title.split(/\s+/), ...article.content.split(/\s+/), ...article.tags];
        keywords.forEach(keyword => {
            keyword = keyword.toLowerCase();
            if (index[keyword]) {
                index[keyword] = index[keyword].filter(articleId => articleId !== id);
                if (index[keyword].length === 0) {
                    delete index[keyword];
                }
            }
        });

        saveArticles();

        return article;
    }
    return null;
};

const saveArticles = () => {
    const data = JSON.stringify({ articles, index }, null, 2);
    fs.writeFileSync(articlesFilePath, data);
};

const addArticle = (title, content, tags = []) => {
    const id = uuidv4();
    const article = { id, title, content, tags, date: new Date() };

    articles.push(article);

    const keywords = [...title.split(/\s+/), ...content.split(/\s+/), ...tags];
    keywords.forEach(keyword => {
        keyword = keyword.toLowerCase();
        if (!index[keyword]) {
            index[keyword] = [];
        }
        index[keyword].push(id);
    });

    saveArticles();

    return article;
};

const searchArticles = (query, sortBy = 'relevance') => {
    const keyword = query.toLowerCase();
    const matchingArticleIds = index[keyword] || [];

    const matchingArticles = articles.filter(article => matchingArticleIds.includes(article.id));

    if (sortBy === 'relevance') {
        matchingArticles.sort((a, b) => {
            return calculateRelevance(query, b) - calculateRelevance(query, a);
        });
    }
    if (sortBy === 'date') {
        matchingArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return matchingArticles;
};

const getArticle = (id) => {
    return articles.find(article => article.id === id);
};

const getArticles = () => {
    return articles;
}

loadArticles();

module.exports = { addArticle, searchArticles, getArticle, getArticles, deleteArticle };