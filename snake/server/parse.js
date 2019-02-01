// 1 请求解析
const url = require('url')
var testURL = "http://127.0.0.1:8899/login?username=zhangsan&pwd=123"
console.log(url.parse(testURL,true))//{username:zhangsan,pwd:123}

// 2将GET/POST传递过来的参数，进行解析
const querystring = require('querystring')
const paramsObj = querystring.parse("http://127.0.0.1:8899/login?username=zhangsan&pwd=123")