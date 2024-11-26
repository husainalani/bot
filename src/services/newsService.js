const axios = require('axios');
const config = require('../config');

class NewsService {
    async getLatestNews() {
        try {
            const response = await axios.get(
                `${config.apis.newsApi}/top-headlines?country=ae&category=business&apiKey=${config.newsApiKey}`
            );
            return response.data.articles.slice(0, config.settings.maxNewsItems);
        } catch (error) {
            console.error('خطأ في جلب الأخبار:', error);
            throw new Error('عذراً، حدث خطأ أثناء جلب الأخبار');
        }
    }
}

module.exports = new NewsService();