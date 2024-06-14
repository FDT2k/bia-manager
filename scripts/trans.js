var http = require('https');
var fs = require('fs');

var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);
    });
  });
}

const locales = [
    'fr',
    'en',
    'de',
    'it',
    'es'
]

locales.map ( function (lang){
  console.log( "http://bim.test/api/translations/bia_manager/translation/"+lang);
  //download("http://bim.test/api/translations/bia_manager/translation/"+lang,"packages/electron/locales/"+lang+"/translation.json");
  //download("https://bim.karsegard.com/api/translations/bia_manager/translation/"+lang,"packages/electron/locales/"+lang+"/translation.json");
    
})