import { PrismaClient, users } from '@prisma/client'
import prisma from '../client.js';



/**
 * 
 * @param kakaoEmail     카카오 이메일
 * @param kakaoNickname  카카오 닉네임
 * @returns 
 */
const kakaoSignUp = async (
  kakaoEmail: string,
  kakaoNickname: string
) => {

  await prisma.users.create({
    data: {
      role: "user",
      identifier: kakaoEmail,
      nickname: kakaoNickname,
      password: null,
      email: null,
      phone: null,
    }
  });
}

const localSignUp = async (
  identifier: string,
  password: string,
  email: string,
  phone: string,
  nickname: string

) => {

  await prisma.users.create({
    data: {
      identifier: identifier,
      password: password,
      email: email,
      nickname: nickname,
      phone: phone,
      role: "user"
    }
  })
}





export default {
  kakaoSignUp,
  localSignUp
}