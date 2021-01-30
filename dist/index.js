"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const cors_1 = __importDefault(require("cors"));
const index_1 = require("./data/index");
const PORT = config_1.default.get('port');
const app = express_1.default();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: { origin: '*' },
});
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(express_1.default.static('client/dist'));
app.get('*', (req, res) => {
    res.sendFile('client/dist/index.html');
});
app.get('/api/chat', (req, res) => {
    res.json({ messages: index_1.messages });
});
io.on('connection', (socket) => {
    socket.on('message', ({ userName, text }) => {
        const message = { id: Date.now(), userName, text };
        index_1.messages.push(message);
        io.emit('message', message);
    });
});
try {
    http.listen(PORT, () => {
        console.log(`Server has been started on port ${PORT}...`);
    });
}
catch (e) {
    console.log('Server error', e);
    process.exit(1);
}
//# sourceMappingURL=index.js.map