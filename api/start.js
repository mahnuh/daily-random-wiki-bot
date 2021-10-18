const sendMessage = require('./send-message');
const { set } = require('./redis');

// Processes messages matching /start
module.exports = async (message) => {
  const chatId = message.chat.id;

  await set(chatId, JSON.stringify(message.chat));

  await sendMessage({
    chat_id: chatId,
    text: '🙋🏼‍♂️ Hi, ich bin DailyRandomWikiBot. Ich sende dir jeden Morgen gegen 9 einen zufälligen Wikipedia-Artikel.',
  });
}