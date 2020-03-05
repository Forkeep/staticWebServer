var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('您需要指定一个端口号...')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method


    /******** 从这里开始看，上面不要看 ************/

    console.log('接收到一个请求！路径（带查询参数）为：' + pathWithQuery)
    let requestPath = path === '/' ? '/index.html' : path
    hashType = {
        '.css': 'text/css',
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpg'
    }
    lastIndex = requestPath.lastIndexOf('.')
    //suffix 后缀
    const suffix = requestPath.substring(lastIndex)
    response.setHeader('Content-Type', `${hashType[suffix] || 'text/html'};charset=utf-8`)
    let content
    try {
        response.statusCode = 200
        content = fs.readFileSync(`./public${requestPath}`)
    } catch (e) {
        console.log(e)
        response.statusCode = 404
        content = content = fs.readFileSync(`./public/404.html`)

    }
    response.write(content)
    response.end()


    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n http://localhost:' + port)