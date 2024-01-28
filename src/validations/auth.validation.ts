
import Joi from 'joi';


const checkLocalLogin = {
  body: Joi.object().keys({
    identifier: Joi.string().required(),    // query 형태로 해당 키 값에 대한 타입 유효성 검사
    password: Joi.string().required(),
    organization: Joi.string().required(),
    challengeId: Joi.number().required()

  })
};

const checkKakaoLogin = {
  body: Joi.object().keys({
    organization: Joi.string().required()

  })
};

const checkSignUp = {
  body: Joi.object().keys({
    identifier: Joi.string().required(),    // query 형태로 해당 키 값에 대한 타입 유효성 검사
    password: Joi.string().required(),
    email : Joi.string().email().required()

  })
};


const checkEmail = {
  body: Joi.object().keys({

    email : Joi.string().email().required(),


  })
};

const checkCode = {
  body: Joi.object().keys({

    email : Joi.string().email().required(),
    code : Joi.string().required()

  })
};

export default {
  checkLocalLogin,
  checkSignUp,
  checkEmail,
  checkCode,
  checkKakaoLogin
};
