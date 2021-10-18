const sendMessage = require('./send-message');
const fetch = require('node-fetch');
const { keys } = require('./redis');

// Processes messages matching /start
module.exports = async () => {
  const response = await fetch(`https://de.wikipedia.org/wiki/Spezial:Zuf%C3%A4llige_Seite`, {
    method: 'GET',
  });

  const url = response.url;

  const chatIds = await keys('*');

  for (const chatId of chatIds) {
    await sendMessage({
      chat_id: chatId,
      text: url,
    });
  }
}