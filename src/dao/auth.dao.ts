import { PrismaClient, User } from '@prisma/client'
import prisma from '../client.js';



/**
 * 
 * @param kakaoEmail     카카오 이메일
 * @param kakaoNickname  카카오 닉네임
 * @returns 
 */
const kakaoSignUp = async (
  kakaoEmail: string,
  kakaoIdentifier: string,
  kakaoProfile: string
) => {

  return await prisma.user.create({
    data: {
      role: "user",
      identifier: String(kakaoIdentifier),
      email:kakaoEmail,
      profile: kakaoProfile,
    
    }
  });
}

const localSignUp = async (
  identifier: string,
  password: string,
  email: string,

) => {

  await prisma.user.create({
    data: {
      identifier: identifier,
      password: password,
      email: email,
      role: "user"
    }
  })
}





export default {
  kakaoSignUp,
  localSignUp
}