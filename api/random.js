const sendMessage = require('./send-message');
const fetch = require('node-fetch');

// Processes messages matching /start
module.exports = async (message) => {
  const chatId = message.chat.id;

  const response = await fetch(`https://de.wikipedia.org/wiki/Spezial:Zuf%C3%A4llige_Seite`, {
    method: 'GET',
  });

  const url = response.url;

  await sendMessage({
    chat_id: chatId,
    text: url,
  });
}