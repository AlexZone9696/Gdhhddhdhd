// api/check-subscription.js
const fetch = require('node-fetch'); // Импортируем библиотеку для отправки HTTP-запросов

module.exports = async (req, res) => {
    const { id } = req.query; // Получаем user_id из параметров запроса

    if (!id) {
        return res.status(400).json({ ok: false, description: 'user_id не указан' });
    }

    const bot_token = '7614849397:AAE82_-UWqd7WaphZXgtNSedkXZl5OdX9Tk'; // Ваш токен бота
    const channel_id = '@TronKeyWallet'; // Имя вашего канала

    const url = `https://api.telegram.org/bot${bot_token}/getChatMember?chat_id=${channel_id}&user_id=${id}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            return res.status(500).json({ ok: false, description: 'Ошибка при запросе к Telegram API' });
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ ok: false, description: 'Ошибка при подключении к Telegram API', error: error.message });
    }
};
