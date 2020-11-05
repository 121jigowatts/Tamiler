const AIMAKER_MODEL_ID = PropertiesService.getScriptProperties().getProperty('AIMAKER_MODEL_ID');
const AIMAKER_API_KEY = PropertiesService.getScriptProperties().getProperty('AIMAKER_API_KEY');

function getImage(url){
  
  return UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'GET'
  });
}

function getCalorie(base64){
  var result = '';
  var url = 'https://aimaker.io/image/classification/api';
  var payload = {
    "id": AIMAKER_MODEL_ID,
    "apikey": AIMAKER_API_KEY,
    "base64": base64
  };
  var response = UrlFetchApp.fetch(url, {   
    method: 'POST', 
    payload: payload, 
    muteHttpExceptions: true
  });
  response = response.getContentText();
  Logger.log(response); 
  var json = JSON.parse(response);
  var labels = sortLabel(json.labels);
  if (labels[0].label && labels[0].score){  
    result = 'こいつは、' + labels[0].label + 'だぜ';
  }

  return result;
}

function sortLabel(labels){
  labels.sort(function(a,b){
    if (a.score > b.score) return -1;
    if (a.score < b.score) return 1;
    return 0;
  });
  return labels;
}
