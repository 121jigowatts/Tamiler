const CHANNEL_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty('CHANNEL_ACCESS_TOKEN');
const UNKNOWN = 'ちょっと何言ってるのかわからないです。';

function doPost(e) {
  
  var post_json = JSON.parse(e.postData.contents);
  var reply_token = post_json.events[0].replyToken;
  var message_type = post_json.events[0].message.type;
  
  if (typeof reply_token === 'undefined') {
    return;
  }
  
  var reply_message = '';

  if (message_type == 'image') {
    reply_to_image(post_json,reply_token);

  } else if (message_type == 'text') {
    reply_to_text_message(post_json,reply_token);

  } else if (message_type == 'sticker') {
    send_reply_sticker(reply_token);
    
  } else {
    return;
  }

  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}

function reply_to_image(post_json,reply_token) {
  var reply_message = '';
  try {
    var url = 'https://api-data.line.me/v2/bot/message/'+ post_json.events[0].message.id +'/content/';
    var image = getImage(url);
    var base64 = Utilities.base64Encode(image.getContent()); 
    
    reply_message = to_tamil(getCalorie(base64));
    if (reply_message == '') {
      reply_message = 'ゼロカロリーかもしれない';
    }
  } catch (ex) {
    reply_message = ex.message;
  }
  
  send_reply_text_message(reply_message,reply_token);
}

function reply_to_text_message(post_json,reply_token) {
  var message = post_json.events[0].message.text;
  var talk_text = talk(message);
  var reply_message = to_tamil(talk_text);
  
  send_reply_text_message(reply_message,reply_token);
}
