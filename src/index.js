const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// توكن البوت الذي حصلت عليه
const token = '7863026836:AAGd5x_PsOhetLX42MvhGN2WC8i9vs-dYUw';
const newsApiKey = '2f46c703-08ec-40d7-9fa3-57121cebf34f'; // استبدل بمفتاح NewsAPI الخاص بك
const bot = new TelegramBot(token, { polling: true });

// رسالة الترحيب عند بدء التفاعل
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const welcomeMessage = `
مرحباً! 👋 أنا بوت متعدد المهام.
يمكنك استخدام الأوامر التالية:
/price - أسعار العملات الرقمية
/news - آخر الأخبار
/help - المساعدة
    `;
    bot.sendMessage(chatId, welcomeMessage);
});

// عرض أسعار العملات الرقمية مع معالجة الأخطاء المحسنة
bot.onText(/\/price/, async (msg) => {
    const chatId = msg.chat.id;
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: {
                ids: 'bitcoin,ethereum,dogecoin',
                vs_currencies: 'usd'
            }
        });

        const bitcoinPrice = response.data.bitcoin.usd;
        const ethereumPrice = response.data.ethereum.usd;
        const dogecoinPrice = response.data.dogecoin.usd;

        const priceMessage = `أسعار العملات الرقمية 📊:\n- Bitcoin: $${bitcoinPrice}\n- Ethereum: $${ethereumPrice}\n- Dogecoin: $${dogecoinPrice}`;
        bot.sendMessage(chatId, priceMessage);
    } catch (error) {
        console.error('خطأ في جلب الأسعار:', error.message);
        bot.sendMessage(chatId, 'عذراً، حدث خطأ في جلب أسعار العملات. يرجى المحاولة لاحقاً.');
    }
});

// عرض الأخبار مع معالجة الأخطاء المحسنة
bot.onText(/\/news/, async (msg) => {
    const chatId = msg.chat.id;
    
    // تحقق من وجود مفتاح الـ API
    if (!newsApiKey || newsApiKey === '2f46c703-08ec-40d7-9fa3-57121cebf34f') {
        return bot.sendMessage(chatId, 'عذراً، لم يتم إدخال مفتاح NewsAPI بعد.');
    }

    try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                country: 'us',
                category: 'business',
                apiKey: newsApiKey,
                pageSize: 5  // محدودية عدد الأخبار
            }
        });

        const articles = response.data.articles;
        
        if (articles.length === 0) {
            return bot.sendMessage(chatId, 'لا توجد أخبار متاحة حالياً.');
        }

        let newsMessage = 'آخر الأخبار 📰:\n\n';
        articles.forEach((article, index) => {
            newsMessage += `${index + 1}. ${article.title}\n${article.url}\n\n`;
        });

        bot.sendMessage(chatId, newsMessage);
    } catch (error) {
        console.error('خطأ في جلب الأخبار:', error.message);
        
        if (error.response && error.response.status === 401) {
            bot.sendMessage(chatId, 'خطأ في مفتاح الـ API. تأكد من صحة المفتاح.');
        } else {
            bot.sendMessage(chatId, 'عذراً، حدث خطأ في جلب الأخبار. يرجى المحاولة لاحقاً.');
        }
    }
});

// أمر المساعدة مع شرح مفصل
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    const helpMessage = `
أوامر البوت 🤖:
- /start : بدء التفاعل مع البوت
- /price : عرض أسعار العملات الرقمية (Bitcoin, Ethereum, Dogecoin)
- /news  : عرض آخر الأخبار التجارية
- /help  : عرض قائمة الأوامر

للحصول على مساعدة إضافية، تواصل مع مطور البوت.
    `;
    bot.sendMessage(chatId, helpMessage);
});

// معالجة الأوامر غير المعروفة
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if (!msg.text.startsWith('/')) {
        bot.sendMessage(chatId, 'عذراً، أمر غير معروف. استخدم /help للحصول على قائمة الأوامر.');
    }
});
