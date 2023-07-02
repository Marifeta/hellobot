require('dotenv').config();
const telegramApi = require('node-telegram-bot-api');
const token = process.env.TOKEN;
const chatId = process.env.CHAT_ID;
const bot = new telegramApi(token, {polling: true});

console.log('Бот запущен!');
console.log('chatId !== 0', chatId !== '0');
console.log('token !== "none"', token !== 'none');
type Message = {
    chat: { id: number },
    new_chat_members: Array<User>,
    new_chat_member: User,
    text: string,
    from: {
        username: string,
    },
}
type User = {
    id: number,
    is_bot: boolean,
    first_name: string,
    last_name?: string,
    username: string
}
bot.on('message', (msg: Message) => {
    try {
        const currentChatId = msg.chat.id;
        console.log(`CurrentChatId: ${currentChatId}`, `ENVChatId: ${chatId}`);
        console.log(msg.new_chat_members, 'new_chat_members');
        if (msg.new_chat_members !== undefined && Number(currentChatId) === Number(chatId)) {
            console.log(msg.new_chat_member);
            if (!msg.new_chat_member.username) {
                bot.sendMessage(currentChatId, `Привет и добро пожаловать в клан (name)\n` +
                    'Тебе, необходимо записать свое имя и ник в разделе "Дешифровка" (link) и ознакомиться с правилами клана, почитать о них можно тут (link) :)');
            } else {
                bot.sendMessage(currentChatId, `Привет @${msg.new_chat_member.username} и добро пожаловать в клан (name)!\n` +
                    'Тебе, необходимо записать свое имя и ник в разделе "Дешифровка" (link) и ознакомиться с правилами клана, почитать о них можно тут (link) :)');
            }

        } if (msg.text === '/test' && Number(currentChatId) === Number(chatId)) {
            bot.sendMessage(currentChatId, `Привет @${msg.from.username} и добро пожаловать в клан (name)!\n` +
                'Тебе, необходимо записать свое имя и ник в разделе "Дешифровка" (link) и ознакомиться с правилами клана, почитать о них можно тут (link) :)');
        } if (msg.text === '/info') {
            bot.sendMessage(currentChatId, 'Привет, я всего лишь маленький бот для приветствия кожаных мешков.');
        }
        if (msg.text === '/start' && Number(currentChatId) === Number(chatId)) {
            bot.sendMessage(currentChatId, 'Я запущен и поприветствую нового члена клана, можете быть уверены :)');
        }
        if (msg.text === '/help' && Number(currentChatId) === Number(chatId)) {
            bot.sendMessage(currentChatId, 'Я запущен и поприветствую нового члена клана, можете быть уверены :)');
        }
    } catch (e) {
        bot.sendMessage(process.env.ERROR_CHAT_ID, `Ошибка: ${e.message}`);
    }
});
