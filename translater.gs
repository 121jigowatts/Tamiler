function to_tamil(text) {
  // タミル語
  var target = 'ta';
  
  try {
    var translatedText = LanguageApp.translate(text,'ja',target);
    return text + '\n' + translatedText;
  } catch(ex) {
    return UNKNOWN;
  }
}
