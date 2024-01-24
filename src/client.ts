import { PrismaClient } from '@prisma/client';
import config from './config/config.js';

// add prisma to the NodeJS global type
interface CustomNodeJsGlobal extends Global {
  prisma: PrismaClient;
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal;

const prisma = global.prisma || new PrismaClient(); // 이미 전역 객체에 prisma 속성이 있다면 그대로 사용, 아니라면 새롭게 선언


if (config.env === 'development') global.prisma = prisma; //  다른 모듈에서도 동일한 Prisma Client 인스턴스를 공유할 수 있도록 함.

export default prisma;
