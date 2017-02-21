var path = require('path')
var express = require('express')
var config = require('../config')
var proxyMiddleware = require('http-proxy-middleware')
var fs = require('fs')
// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.build.port
var app = express()



var proxyTable = config.build.proxyTable;
// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  console.log(context,options)
  app.use(proxyMiddleware(context, options))
})


app.get(/.*/, function(req, res, next){
  if(req.path.match(/.+\..+$/)){
    next()
  }else{

    fs.readFile(config.build.index, function (err, content) {
      if (err) return;
      res.send(content.toString())
    })
  }

});

var staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory)
app.use(staticPath, express.static(path.join(config.build.assetsRoot, config.build.assetsSubDirectory)))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
