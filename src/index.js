const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const commandHandlers = require('./handlers/commandHandlers');

console.log('جاري تشغيل البوت...');

const bot = new TelegramBot(config.telegramToken, { polling: true });

// تسجيل الأوامر
bot.onText(/\/start/, (msg) => commandHandlers.handleStart(bot, msg.chat.id));
bot.onText(/\/price/, (msg) => commandHandlers.handlePrice(bot, msg.chat.id));
bot.onText(/\/news/, (msg) => commandHandlers.handleNews(bot, msg.chat.id));
bot.onText(/\/help/, (msg) => commandHandlers.handleHelp(bot, msg.chat.id));

// معالجة الأخطاء
bot.on('polling_error', (error) => {
    console.error('خطأ في اتصال البوت:', error);
});

// معالجة الرسائل غير المعروفة
bot.on('message', (msg) => {
    if (!msg.text.startsWith('/')) {
        bot.sendMessage(msg.chat.id, 'عذراً، لا أفهم هذا الأمر. استخدم /help لمعرفة الأوامر المتاحة.');
    }
});