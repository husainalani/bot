require('dotenv').config();

module.exports = {
    telegramToken: process.env.TELEGRAM_BOT_TOKEN,
    newsApiKey: process.env.NEWS_API_KEY,
    apis: {
        coingecko: 'https://api.coingecko.com/api/v3',
        newsApi: 'https://newsapi.org/v2'
    }
};