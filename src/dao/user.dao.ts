import { PrismaClient, User } from '@prisma/client'
import prisma from '../client.js';




/**
 * 
 * @param userIdentifier 유저 아이디
 * @returns 1. 유저에 대한 아이디, 권한, 비밀번호
 *          2. 오류 시 false반환
 */
const userInformationSelect = async <Key extends keyof  User>(
  identifier: string,
  keys: Key[] = [
    'user_id',
    'role',
    'password'
  ] as Key[]
): Promise<Pick< User, Key> | null> => {
  // 1. 초기에는 빈 객체 {}가 주어집니다. ( obj가 빈 객체 역할)
  // 2. 첫 번째 반복에서, k가 'user_id'일 때, { ...obj, [k]: true }는 { 'user_id': true }가 됩니다.
  // 3. 두 번째 반복에서, k가 'role'일 때, { 'user_id': true, 'role': true }가 됩니다.
  return prisma.user.findUnique({
    where: { identifier: String(identifier) },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick< User, Key> | null>;
}


const selectUser = async (
  userId: number
):Promise<User>=> {

  const userData = await prisma.$queryRaw<User[]>`
  
  SELECT u.* FROM User as u 
  WHERE u.user_id = ${userId};`


  return userData[0]
}



/**
 * 유저 아이디 조회 함수
 * @param userEmail 유저 이메일
 * @returns 1. 유저 아이디 반환
 *          2. 실패 시 false 반환
 */
const identifierSelect = async <Key extends keyof  User>(
  email: string,
  keys: Key[] = ['identifier'] as Key[]
): Promise<Pick< User, Key> | null> => {

  return (await prisma.user.findMany({
    where: { email: email, 
    },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }))[0] as Pick< User, Key> | null;
}

const selectEmail = async <Key extends keyof  User>(
  email: string,
  keys: Key[] = ['email'] as Key[]
): Promise<Pick< User, Key> | null> => {

  return prisma.user.findUnique({
    where: { email },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick< User, Key> | null>;
};


const selectPassword = async <Key extends keyof  User>(
  userId: number,
  keys: Key[] = ['password'] as Key[]
): Promise<Pick< User, Key> | null> => {

  return prisma.user.findUnique({
    where: { user_id: userId },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick< User, Key> | null>;
};

const selectIdentifierAndEmail = async <Key extends keyof User>(
  identifier: string,
  keys: Key[] = ['identifier', 'email'] as Key[]
): Promise<Pick< User, Key> | null> => {

  return prisma.user.findUnique({
    where: { identifier },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick< User, Key> | null>;
};


const updatePassword = async <Key extends keyof  User>(
  userId: number,
  password: string
): Promise<void> => {

  await prisma.user.update({
    where: { user_id: userId },
    data: { password: password }
  }) as Pick< User, Key> | null;
};


/**
 * 임시 비밀 번호 업데이트 함수
 * @param userIdentifier 유저 아이디
 * @param userEmail      유저 이메일
 * @param encryptedPassword  암호화 된 비밀번호
 * @param randomPassword     랜덤 비밀 번호
 * @returns   1. 랜덤 비밀 번호
 *            2. 실패 시 false 반환
 */
const updateRandomPassword = async (
  identifier: string,
  email: string,
  password: string
) => {

  await prisma.user.updateMany({
    where: {
      identifier: identifier,
      email: email
    },
    data: {
      password: password
    }
  });
}




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


const updateUserMyPageData = async (
  userId: number,
  accountNumber: string, 

) => {

  return await prisma.$queryRaw
  `
  UPDATE User as u 
  SET u.account_number = ${accountNumber}
  WHERE u.user_id = ${userId}
  `
}







export default {
  userInformationSelect,
  identifierSelect,
  selectPassword,
  updatePassword,
  selectEmail,
  selectIdentifierAndEmail,
  updateRandomPassword,
  selectUser,
  kakaoSignUp,
  localSignUp,
  updateUserMyPageData
}