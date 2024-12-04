const calculateRelevance = (query, article) => {
    const text = article.title + " " + article.content;
    const regex = new RegExp(`\\b${query}\\b`, 'gi'); 
    const matches = (text.match(regex) || []).length;
    return matches;
};

module.exports = { calculateRelevance };
