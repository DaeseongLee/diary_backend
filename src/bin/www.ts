import Debug from 'debug'
import * as dotenv from 'dotenv';
import express from 'express';
import path from 'path';

const profile = process.env.NODE_ENV || 'local-dev';
dotenv.config({
    path: path.join(__dirname, '../../', profile + '.env'),
})

//=========================
// 주의!!  import 를 정리하지 마세요! ../app 는 dotenv 초기화 이후에 import 되어야 합니다.
//=========================
import App from '../app';

const port: number = Number(process.env.PORT) || 3000;
const app: express.Application = new App().app;
const debug = Debug('diary_backend:*')
app.listen(port, onListening).on('error', onError);

function onError(error: any) {
    if (error.syscall !== 'listen') {
        throw error
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
        default:
            throw error
    }
}

function onListening() {
    const bind = 'port ' + port;
    debug('Listening on ' + bind)
}