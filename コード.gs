function doPost(e) {
  const token = PropertiesService.getScriptProperties().getProperty('CHANNEL_ACCESS_TOKEN');
  var post_json = JSON.parse(e.postData.contents);
  var reply_token = post_json.events[0].replyToken;
  if (typeof reply_token === 'undefined') {
    return;
  }
  var message = post_json.events[0].message.text;
  var reply = talk(message);

  var reply_message = '';
  // タミル語
  var target = 'ta';

  var translatedText = LanguageApp.translate(reply,'ja',target);
  if (message === translatedText) {
    reply_message = 'ちょっと何言ってるのかわからないです。';
  } else {
    reply_message = reply + '\n' + translatedText;
  }
  
  var url = 'https://api.line.me/v2/bot/message/reply';
 
  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + token,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': [{
        'type': 'text',
        'text': reply_message,
      }],
    }),
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}

function talk(message) {
  const talk_api_key = PropertiesService.getScriptProperties().getProperty('TALK_API_KEY');
  var STATUS_SUCCESS = 0;

  try {
    var formData = {
      apikey: talk_api_key,
      query: message
    }
    var options = {
      'method' : 'post',
      'payload' : formData
    }
    
    var result = UrlFetchApp.fetch("https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk", options)
    var jsonData = JSON.parse(result.getContentText());
    Logger.log(jsonData);
    var jsonData = JSON.parse(result.getContentText());
    if (jsonData.status != STATUS_SUCCESS) {
      return '（　＾ω＾）・・・';
    }
    return jsonData.results[0].reply;
  } catch(e) {
    Logger.log('エラー');
    return 'なぞのエラー';
  }
}