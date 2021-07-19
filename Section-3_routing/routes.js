
const requestHandler = (req,res)=>{

    
    if(req.url === '/'){
        res.setHeader('content-type','text/html');
        res.write('<html>');
        res.write('<head>Welcome to NodeJS</head>');
        res.write("<body><form action='/create-user' method='POST'><input type='text' name='username'><button type='submit'>send</button></form></body>");
        res.write('</html>');
        return res.end();
    }
    
    if(req.url === '/users'){
        res.setHeader('content-type','text/html');
        res.write('<html>');
        res.write('<head>Welcome to NodeJS</head>');
        res.write("<body><ul><li>user1</li><li>user2</li></ul></body>");
        res.write('</html>');
        return res.end();
    }
    if(req.url === '/create-user'){
        const body = [];
        req.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk);
        }).on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            const text = parsedBody.split('=')[1];
            console.log(text);
        })
       
        res.statusCode = 302;
        res.setHeader('Location','/');
        return res.end();
    }

    res.setHeader('content-type','text/html');
    res.write('<html>');
    res.write('<head>Welcome to NodeJS</head>');
    res.write('<body><h1>This is my first Node.js response</h1></body>');
    res.write('</html>');
    res.end();
};


exports.handler = requestHandler
exports.someText = 'siva'

