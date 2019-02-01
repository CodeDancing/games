// //1、导入我们需要的核心模块(NodeJS提供的模块我们称之为核心模块)
// var http = require('http');
//
// //2、利用获取到的核心模块的对象，创建一个server对象
// var server = http.createServer();
//
// //3、利用server对象监听浏览器的请求，并且处理(请求-处理-响应)
// server.on('request',function(req,res){
//     res.end("welcome");
// });
//
// //4、开启web服务开始监听
// server.listen(8080,'127.0.0.1',function(){
//     console.log('开启服务器成功');
// });
//
//

var http = require('http')
var url = require('url')
var fs = require('fs')
var path = require('path')

http.createServer(function (req, res){
    //解析请求
    var pathname = url.parse(req.url).pathname
    if(pathname === '/index') {
        //只处理请求 index 这一种情况
        fs.readFile(path.join(__dirname, './index.html'), 'utf-8', function (err, file){
            if(err) console.log(err)
            //假数据
            var data = {
                "title": "MVC project",
                "author": "ltaoo",
                "content": "a project content"
            }
            //获取html 文件并将其中的 {{xx}} 和 data 数据进行匹配。
            var pattern = /({{)[a-z]+(}})/g;
            var ary = file.match(pattern);
            for (var i = ary.length - 1; i >= 0; i--) {
                ary[i] = ary[i].replace(/\W/g, '');
            }
            console.log(ary)
            // 将 html 文件内的变量替换
            for (var j = ary.length - 1; j >= 0; j--) {
                file = file.replace('{{' + ary[j] + '}}', data[ary[j]])
            }
            // 渲染页面
            res.writeHead(200, {"Content-Type": "text/html"})
            res.write(file)
            res.end()
        })
    }
}).listen(3000)

console.log('server is listening at port 3000');