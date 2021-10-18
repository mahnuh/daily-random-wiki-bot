// Load env config
require('dotenv').config();

// Import modules
const start = require('./start');
const sendMessage = require('./send-message');
const random = require('./random');
const randomAll = require('./random-all');

module.exports = async (req, res) => {
  // Check if Telegram message
  if (req.body && (req.body.message || req.body.callback_query)) {
    // Get message object
    const message = {};

    if (req.body.message) {
      message = req.body.message;
    }
    // Callback query depends on request
    if (req.body.callback_query) {
      message = req.body.callback_query.message;
      message.data = req.body.callback_query.data;

      // Answer callback query
      sendMessage({
        callback_query_id: req.body.callback_query.id
      }, 'answerCallbackQuery');
    }

    // Build context
    const ctx = {
      request: null // await get(`request:${message.chat.id}`) -> See part 2
    }

    // Request is either current state if set or message text
    ctx.request = ctx.request || message.text;

    // Match text request
    if (ctx.request.match('/start(.*)')) {
      await start(message, ctx);
    }

    if (ctx.request.match('/random(.*)')) {
      await random(message, ctx);
    }
  }

  if (req.query && req.query.secret === 'shingshong') {
    await randomAll();
  }

  // Send default message
  res.end('This is the ExampleBot API.')
}