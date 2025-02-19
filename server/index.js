const {createServer,h}= require('node:http')
const cors = require("cors")
// cors()

const port=3030
const server= createServer(function(req,res){
    res.end('hello world')

} )

http

server.listen(port,function(){

console.log(port);

})