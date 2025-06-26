const http = require('http');
const data1 = require('./data');

http.createServer((r,resp)=>{
    resp.writeHead(200,{'Content-Type' : 'application/json'});
    data = [{id:1,name: 'raj'},
        {id:2,name: 'kumar'},
        {id:3,name: 'suresh'},
        {id:4,name: 'suresh'},

    ]
    resp.end(JSON.stringify(data));
}).listen(4000,()=>{
    console.log('server is running on port 4000');
})

http.createServer((r,resp)=>{
    resp.writeHead(200,{'Content-Type': 'application/json'});
    resp.end(JSON.stringify(data1));
}).listen(5000,()=>{
    console.log('server is running on port 5000');
})

http.createServer((r,resp)=>{
    console.log(process.argv)
    resp.end("process");
}).listen(4001);