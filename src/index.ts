import { Server } from 'http';
import app from './app.js';
import prisma from './client.js';
import {logger} from './config/logger.js';
import { challengeScheduler } from './modules/challengeScheduler.js';
import config from './config/config.js';
let server: Server;
prisma.$connect().then(() => {
  console.info('Connected to SQL Database');
  server = app.listen(config.port,() => {
    console.info('Writon Server Start');
    challengeScheduler();
  })
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: unknown) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);  //예외가 처리되지 않고 남아있을 때 발생 
process.on('unhandledRejection', unexpectedErrorHandler); // 프로미스의 rejection이 처리되지 않았을 때 발생합니다.

process.on('SIGTERM', () => {        //  프로세스에게 종료 신호가 전송되었을 때 발생
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
