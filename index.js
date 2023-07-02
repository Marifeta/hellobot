require('dotenv').config();
var telegramApi = require('node-telegram-bot-api');
var token = process.env.TOKEN;
var chatId = process.env.CHAT_ID;
var bot = new telegramApi(token, { polling: true });
console.log('Бот запущен!');
console.log('chatId !== 0', chatId !== '0');
console.log('token !== "none"', token !== 'none');
bot.on('message', function (msg) {
    try {
        var currentChatId = msg.chat.id;
        console.log("CurrentChatId: ".concat(currentChatId), "ENVChatId: ".concat(chatId));
        console.log(msg.new_chat_members, 'new_chat_members');
        if (msg.new_chat_members !== undefined && Number(currentChatId) === Number(chatId)) {
            console.log(msg.new_chat_member);
            if (!msg.new_chat_member.username) {
                bot.sendMessage(currentChatId, "\u041F\u0440\u0438\u0432\u0435\u0442 \u0438 \u0434\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C \u0432 \u043A\u043B\u0430\u043D (name)\n" +
                    'Тебе, необходимо записать свое имя и ник в разделе "Дешифровка" (link) и ознакомиться с правилами клана, почитать о них можно тут (link) :)');
            }
            else {
                bot.sendMessage(currentChatId, "\u041F\u0440\u0438\u0432\u0435\u0442 @".concat(msg.new_chat_member.username, " \u0438 \u0434\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C \u0432 \u043A\u043B\u0430\u043D (name)!\n") +
                    'Тебе, необходимо записать свое имя и ник в разделе "Дешифровка" (link) и ознакомиться с правилами клана, почитать о них можно тут (link) :)');
            }
        }
        if (msg.text === '/test' && Number(currentChatId) === Number(chatId)) {
            bot.sendMessage(currentChatId, "\u041F\u0440\u0438\u0432\u0435\u0442 @".concat(msg.from.username, " \u0438 \u0434\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C \u0432 \u043A\u043B\u0430\u043D (name)!\n") +
                'Тебе, необходимо записать свое имя и ник в разделе "Дешифровка" (link) и ознакомиться с правилами клана, почитать о них можно тут (link) :)');
        }
        if (msg.text === '/info') {
            bot.sendMessage(currentChatId, 'Привет, я всего лишь маленький бот для приветствия кожаных мешков.');
        }
        if (msg.text === '/start' && Number(currentChatId) === Number(chatId)) {
            bot.sendMessage(currentChatId, 'Я запущен и поприветствую нового члена клана, можете быть уверены :)');
        }
        if (msg.text === '/help' && Number(currentChatId) === Number(chatId)) {
            bot.sendMessage(currentChatId, 'Я запущен и поприветствую нового члена клана, можете быть уверены :)');
        }
    }
    catch (e) {
        bot.sendMessage(process.env.ERROR_CHAT_ID, "\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(e.message));
    }
});
//# sourceMappingURL=index.js.map