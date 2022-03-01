const http = require('http');
const fs = require('fs');

http.createServer(function(req,res) {
    // console.log(req.url);
    res.writeHead(200,{'content-type':'text/html'});
    
    // res.statusCode=200;
    // res.setHeader('Content-type','text/plain');
    if(req.url == '/') {

        // res.write('<h1> Http server</h1>');
        // res.end();
        fs.readFile('./views/h1.html',(err, data) => {
            if(err) {
                console.log(err);
                res.end();
            } else {
                // res.write(data);
                res.end(data);

            }
            
        })

    }
    if(req.url == '/info') {
        res.write('<h1>Welcome</h1>');
        res.end();
    }
   
}
).listen('3000');
console.log("Server running at 3000");
