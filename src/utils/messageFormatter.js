// أدوات تنسيق الرسائل
function formatCryptoPrices(prices) {
    return Object.entries(prices)
        .map(([currency, price]) => `${currency === 'bitcoin' ? 'بيتكوين' : 'إيثيريوم'}: $${price}`)
        .join('\n');
}

function formatNewsArticles(articles) {
    return articles
        .map((article, index) => `${index + 1}. ${article.title}\n${article.url}`)
        .join('\n\n');
}

module.exports = {
    formatCryptoPrices,
    formatNewsArticles
};