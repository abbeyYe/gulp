var http = require('http');
var fs = require('fs'); //引入文件读取模块
var url = require('url'); //引入文件读取模块

var documentRoot = 'D:/test/gulp/src';
//需要访问的文件的存放目录

var server = http.createServer(function(req, res) {

    var path = req.url;
    var content_type = 'text/plain;charset="utf-8"';
    //客户端输入的url，例如如果输入localhost:8888/index.html
    //那么这里的url == /index.html 

    var file = documentRoot + path;
    console.log(path);
    //D:/test/gulp/src/index.html 

    if (path.indexOf(".html") != -1 && path.indexOf("?") != -1) {
        var data = { data: 'haha', status: '200' }
        content_type = 'application/json;charset="utf-8"';
        res.writeHeader(200, {
            'content-type': content_type
        });
        //res.write('{msg:success!}'); //将index.html显示在客户端
        res.end(JSON.stringify(data));
        return
    }
    /*if (path.indexOf(".html") != -1 && path.indexOf("?") != -1) {
        fs.read(pathname + '.js')
        var result = excecute(req)
        
        content_type = 'application/json;charset="utf-8"';
        res.writeHeader(200, {
            'content-type': content_type
        });
        // res.write('{msg:success!}'); //将index.html显示在客户端
        res.end(JSON.stringify(result));
        return
    }*/

    if (path.indexOf(".css") != -1) {
        content_type = 'text/css;charset="utf-8"';
        loadfile(req, res, file, content_type)
        return
    }
    if (path.indexOf(".html") != -1) {
        content_type = 'text/html;charset="utf-8"';
        loadfile(req, res, file, content_type)
        return
    }
    if (path.indexOf(".js") != -1) {
        content_type = 'text/javascript;charset="utf-8"';
        loadfile(req, res, file, content_type)
        return
    }

}).listen(8888);

console.log('服务器开启成功');

function loadfile(req, res, file, content_type) {
    fs.readFile(file, function(err, data) {
        /*
            一参为文件路径
            二参为回调函数
                回调函数的一参为读取错误返回的信息，返回空就没有错误
                二参为读取成功返回的文本内容
        */
        if (err) {
            res.writeHeader(404, {
                'content-type': 'text/html;charset="utf-8"'
            });
            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            res.end();
        } else {
            res.writeHeader(200, {
                'content-type': content_type
            });
            res.write(data); //将index.html显示在客户端
            res.end();

        }

    });
}