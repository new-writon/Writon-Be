import * as redis from 'redis';
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
import { smtpTransport } from "../config/email.js";
require('dotenv').config();


const sendInvitationEmail = async  (
  organizaiton: string,
  challengeId: number,
  email: string
  
  ) => {
   
    const mailOptions = {
      from: "teamwritoner" + "@gmail.com",
      to: email,
      subject: '[Writon] 요청하신 서비스 이메일 인증 번호를 안내해드립니다.',
      html: `
      <p>초대장 입니다.</p>

      <a href="https://www.writon.co.kr/login?organization=${organizaiton}&challengeId=${challengeId}">링크 텍스트</a>
      `
    };

    smtpTransport.sendMail(mailOptions);

    smtpTransport.close();

}



const sendCodeEmail = async  (
  email: string,
  code: number
  ) => {
   
    const mailOptions = {
      from: "teamwritoner" + "@gmail.com",
      to: email,
      subject: '[Writon] 요청하신 서비스 이메일 인증 번호를 안내해드립니다.',
      html: `
      <p>본 메일은 Writon 서비스의 회원가입을 위한 이메일 인증입니다.</p>
    
      <p>진행 중인 화면에 인증번호를 정확히 입력해주세요.</p>
    
      <p>인증번호는 메일 발송 시점부터 3분 동안 유효합니다.</p>
    
      <p><strong>** 인증 코드 **</strong> : ${code}</p>
      `
    };

    smtpTransport.sendMail(mailOptions);

    smtpTransport.close();

}


const randomPasswordsmtpSender = async (email: string, randomPassword: string) => {

    const mailOptions = {
      from: "teamwritoner" + "@gmail.com",
      to: email,
      subject: '[Writon] 임시 비밀번호 안내',
      html: `
      <p>안녕하세요, 라이톤 입니다. </p>
    
      <p>회원님의 임시 비밀번호는 다음과 같습니다.</p>
    
      <p>개인정보 보호를 위해 로그인 후 새로운 비밀번호로 변경해주시기 바랍니다.</p>

      <strong>임시비밀번호</strong>  : ${randomPassword}
      `
    };
    smtpTransport.sendMail(mailOptions);
    smtpTransport.close();


}

export default {
  randomPasswordsmtpSender,
  sendCodeEmail,
  sendInvitationEmail
}




