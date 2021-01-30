import express from 'express';
//import config from 'config';
import cors from 'cors';
import { Socket } from 'dgram';
import { messages } from './data/index';
import Message from './interfaces/Message';

//const PORT: number = config.get('port');
const PORT: number = 5000;

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: { origin: '*'},
});

app.use(express.json());
app.use(cors());
app.use(express.static('client/dist'));

app.get('*', (req, res) => {
  res.sendFile('client/dist/index.html');
});

app.get('/api/chat', (req, res) => {
  res.json({ messages });
});

io.on('connection', (socket: Socket) => {
  socket.on('message', ({userName, text}: Message) => {
    const message = { id: Date.now(), userName, text };

    messages.push(message);
    io.emit('message', message);
  })
});

try {
  http.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
  });
} catch (e) {
  console.log('Server error', e);
  process.exit(1);
}
