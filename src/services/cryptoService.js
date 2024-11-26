const axios = require('axios');
const config = require('../config');

class CryptoService {
    async getCryptoPrices() {
        try {
            const currencies = config.settings.supportedCurrencies.join(',');
            const response = await axios.get(
                `${config.apis.coingecko}/simple/price?ids=${currencies}&vs_currencies=usd`
            );
            return {
                bitcoin: response.data.bitcoin.usd,
                ethereum: response.data.ethereum.usd
            };
        } catch (error) {
            console.error('خطأ في جلب أسعار العملات:', error);
            throw new Error('عذراً، حدث خطأ أثناء جلب أسعار العملات الرقمية');
        }
    }
}

module.exports = new CryptoService();