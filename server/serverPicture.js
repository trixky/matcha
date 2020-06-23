const path = require("path")
const http = require("http")
var fs = require("fs")


var dir = path.join(__dirname, "public")

var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

var server = http.createServer(function(req, res){
    
    var reqpath = req.url.toString().split('?')[0];
    
    if (req.method !== 'GET'){
        res.statusCode = 501;
        res.setHeader("Content-Type", "text/plain");
        return res.end("Method not implemented");
    }

    var file = path.join(dir, reqpath)
    
    if (file.indexOf(dir, path.sep) !== 0){
        res.statusCode = 403;
        res.setHeader("Content-Type", "text/plain")
        return res.end("Forbidden");
    }
    var type = mime[path.extname(file).slice(1)] || 'text/plain';

    var s = fs.createReadStream(file);
    s.on('open', function(){
        res.setHeader("Content-Type", type);
        s.pipe(res);
    })

    s.on("error", function(){
        
        s = fs.createReadStream(__dirname + "/ressource/canard.jpg");
        s.on('open', function(){
            res.setHeader("Content-Type", type);
            s.pipe(res);
        })
        s.on("error", function(){
        res.setHeader("Content-Type", mime.jpeg);
        return res.end("Not found")
        })
    })
})

server.listen(3002, function(){
})