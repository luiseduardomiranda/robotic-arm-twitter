import { Observable } from 'rxjs';
import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import path from 'path';

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use('/', express.static(path.resolve(process.cwd(), 'assets')));

server.listen(8080);

export const showTweet = (tweet) => {
    io.emit('tweet', tweet);
};
