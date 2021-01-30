import express from 'express';
import config from 'config';
import chatRouter from './routes/chat';
import cors from 'cors';

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', () => {
  console.log('connected');
});


const PORT: number = config.get('port');

app.use(cors());
app.use('/api/chat', chatRouter);

try {
  http.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
  });
} catch (e) {
  console.log('Server error', e);
  process.exit(1);
}
