const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
const messages = [];
const users = [];

app.use(express.static(path.join(__dirname, '/client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);
io.on('connection', (socket) => {
  socket.on('login', (login) => {
    users.push({name: login, id: socket.id})
    socket.broadcast.emit('message', {author: 'Chat Bot', content: `<i>${login} has joined the conversation!</i>`});
  });
  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
  socket.on('disconnect', () => {
    const user = users.find(object => object.id === socket.id)
    const index = users.indexOf(user);
    users.splice(index, 1);
    socket.broadcast.emit('message', {author: 'Chat Bot', content: `<i>${user.name} has left the conversation... :(</i>`});
  });
});
