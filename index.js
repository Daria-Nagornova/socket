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

const Message = require('./models/Message');

io.on('connection', (socket) => {
    socket.on('message', function (message) {
            socket.join('room:' + message.id);
            io.to('room:' + message.id).emit('message', message);
            async function storeMessage() {
                await Message.create({'text': message.text});
            }
            storeMessage();
    });
    async function getMessages() {
        return await Message.findAll({});
    }

})

setTimeout(() => {
    const count = io.engine.clientsCount;
    let count1 = 0;
    let count2 = 0;
    if(io.sockets.adapter.rooms.get('room:1')) count1 = io.sockets.adapter.rooms.get('room:1').size;
    if(io.sockets.adapter.rooms.get('room:2')) count2 = io.sockets.adapter.rooms.get('room:2').size;
    console.log(count);
    console.log('count1: '+ count1);
    console.log('count2:' + count2);
}, 5000)

httpServer.listen(3000, () => {
    console.log('Server is runing...')
});