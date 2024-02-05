import { PrismaClient, ErrorLog } from '@prisma/client'
import prisma from '../client.js';





const saveError = async (
    level: string,
    message: string,
    timestamp: string
  ) => {
  
    await prisma.errorLog.create({
      data: {
        level: level,
        message: message,
        timestamp: timestamp
      }
    })
  }
  
  









export default {

    saveError
  }