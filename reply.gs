function send_reply(options) {
  var url = 'https://api.line.me/v2/bot/message/reply';
 
  UrlFetchApp.fetch(url, options);
}

function send_reply_text_message(reply_message,reply_token) {
  var options = {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': [{
        'type': 'text',
        'text': reply_message,
      }],
    }),
  };
  
  send_reply(options);
}

function send_reply_sticker(reply_token) {  
  var options = {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': [{
        'type': 'sticker',
        'packageId': '1',
        'stickerId': '1'
      }],
    }),
  };
  
  send_reply(options);
}