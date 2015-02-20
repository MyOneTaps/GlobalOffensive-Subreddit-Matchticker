var http = require('http'),
    io = require('socket.io-client'),
    url = require('url');

var server = http.createServer(function(request, response) {
    response.writeHead(200, {
        'Content-type': 'text/plain'
    });
    
    var queryObject = url.parse(request.url,true).query;
    var matchid = queryObject.matchid;
    
    socket = io.connect('http://scorebot.hltv.org:10022');
    socket.on('score', function(score) {
        
        jsonobj = {
            "scorea" : score['ctScore'],
            "scoreb" : score['tScore']
        };
        
        response.end(JSON.stringify(jsonobj));
    });
    socket.emit('readyForMatch', matchid);
});

server.listen(8000, 'ikinz.se');