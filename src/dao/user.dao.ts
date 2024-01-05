import { PrismaClient, users } from '@prisma/client'
import prisma from '../client.js';




/**
 * 
 * @param userIdentifier 유저 아이디
 * @returns 1. 유저에 대한 아이디, 권한, 비밀번호
 *          2. 오류 시 false반환
 */
const userInformationSelect = async <Key extends keyof users>(
  identifier: string,
  keys: Key[] = [
    'user_id',
    'role',
    'password'
  ] as Key[]
): Promise<Pick<users, Key> | null> => {
  // 1. 초기에는 빈 객체 {}가 주어집니다. ( obj가 빈 객체 역할)
  // 2. 첫 번째 반복에서, k가 'user_id'일 때, { ...obj, [k]: true }는 { 'user_id': true }가 됩니다.
  // 3. 두 번째 반복에서, k가 'role'일 때, { 'user_id': true, 'role': true }가 됩니다.
  return prisma.users.findUnique({
    where: { identifier },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<users, Key> | null>;
}


/**
 * 유저 아이디 조회 함수
 * @param userEmail 유저 이메일
 * @returns 1. 유저 아이디 반환
 *          2. 실패 시 false 반환
 */
const identifierSelect = async <Key extends keyof users>(
  nickname: string,
  email: string,
  keys: Key[] = ['identifier'] as Key[]
): Promise<Pick<users, Key> | null> => {

  return (await prisma.users.findMany({
    where: { email: email, nickname: nickname },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }))[0] as Pick<users, Key> | null;
}

const selectEmail = async <Key extends keyof users>(
  email: string,
  keys: Key[] = ['email'] as Key[]
): Promise<Pick<users, Key> | null> => {

  return prisma.users.findUnique({
    where: { email },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<users, Key> | null>;
};


const selectPassword = async <Key extends keyof users>(
  userId: number,
  keys: Key[] = ['password'] as Key[]
): Promise<Pick<users, Key> | null> => {

  return prisma.users.findUnique({
    where: { user_id: userId },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<users, Key> | null>;
};

const selectIdentifierAndEmail = async <Key extends keyof users>(
  identifier: string,
  keys: Key[] = ['identifier', 'email'] as Key[]
): Promise<Pick<users, Key> | null> => {

  return prisma.users.findUnique({
    where: { identifier },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<users, Key> | null>;
};


const updatePassword = async <Key extends keyof users>(
  userId: number,
  password: string
) => {

  await prisma.users.update({
    where: { user_id: userId },
    data: { password: password }
  }) as Pick<users, Key> | null;
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

  await prisma.users.updateMany({
    where: {
      identifier: identifier,
      email: email
    },
    data: {
      password: password
    }
  });
}




export default {
  userInformationSelect,
  identifierSelect,
  selectPassword,
  updatePassword,
  selectEmail,
  selectIdentifierAndEmail,
  updateRandomPassword
}