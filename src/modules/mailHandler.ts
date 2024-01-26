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
      from: "teamwritoner",
      to: email,
      subject: `[Writon] ${organizaiton}의 챌린지에 참여해보세요`,
      html: `
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Image and Button Link</title>
        </head>
        <body style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0;">
          <div style="display: flex; justify-content: center; flex-direction: column; align-items: center; margin-bottom: 20px;">
            <img src="https://writon-data.s3.ap-northeast-2.amazonaws.com/invitation/%EC%B4%88%EB%8C%80%EC%9E%A5.png" alt="Your Image">
          </div>
          <div style="display: flex; justify-content: center; flex-direction: column; align-items: center; margin-bottom: 20px;">
            <a href="https://www.writon.co.kr/login?organization=${organizaiton}&challengeId=${challengeId}">
              <img src="https://writon-data.s3.ap-northeast-2.amazonaws.com/invitation/%EC%B4%88%EB%8C%80%EC%9E%A5+%EB%B2%84%ED%8A%BC.png" alt="Your Button Image">
            </a>
          </div>
        </body>
      `
    };

    console.log(smtpTransport)
    
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




