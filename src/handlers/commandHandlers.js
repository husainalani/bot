const cryptoService = require('../services/cryptoService');
const newsService = require('../services/newsService');
const { formatCryptoPrices, formatNewsArticles } = require('../utils/messageFormatter');

class CommandHandlers {
    async handleStart(bot, chatId) {
        const message = 'مرحباً بك في بوت الأخبار والعملات الرقمية! 🚀\n\n' +
                       'يمكنك استخدام الأوامر التالية:\n' +
                       '/price - لعرض أسعار العملات الرقمية\n' +
                       '/news - لعرض آخر الأخبار\n' +
                       '/help - لعرض المساعدة';
        await bot.sendMessage(chatId, message);
    }

    async handlePrice(bot, chatId) {
        try {
            const prices = await cryptoService.getCryptoPrices();
            const message = `💰 أسعار العملات الرقمية:\n${formatCryptoPrices(prices)}`;
            await bot.sendMessage(chatId, message);
        } catch (error) {
            await bot.sendMessage(chatId, error.message);
        }
    }

    async handleNews(bot, chatId) {
        try {
            const articles = await newsService.getLatestNews();
            const message = `📰 آخر الأخبار:\n\n${formatNewsArticles(articles)}`;
            await bot.sendMessage(chatId, message);
        } catch (error) {
            await bot.sendMessage(chatId, error.message);
        }
    }

    async handleHelp(bot, chatId) {
        const message = '🔍 الأوامر المتاحة:\n\n' +
                       '/start - بدء استخدام البوت\n' +
                       '/price - عرض أسعار العملات الرقمية\n' +
                       '/news - عرض آخر الأخبار\n' +
                       '/help - عرض هذه القائمة';
        await bot.sendMessage(chatId, message);
    }
}

module.exports = new CommandHandlers();