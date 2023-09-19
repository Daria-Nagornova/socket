const { createServer } = require('http')
const { Server } = require('socket.io')
const fs = require('fs')

const httpServer = createServer((req, res) => {

    if (req.method === 'GET' && req.url === '/') {

        let content = fs.readFileSync('./views/index.html', 'utf-8')

        res.end(content)

    }

});

const io = new Server(httpServer, {

    /* options */

})

const messages = ['Hello world!', 'New Message']

io.on('connection', (socket) => {
    socket.on('message', function (message) {
        socket.emit('message', message);
        setTimeout(() => {
            socket.disconnect();
        }, 5000);
    });
   /* messages.forEach((message) => {
        socket.emit('message', message)
    })*/
})

httpServer.listen(3000, () => {
    console.log('Server is runing...')
});