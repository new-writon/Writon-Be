
import Joi from 'joi';


const checkIdentifier = {
  query: Joi.object().keys({
    identifier: Joi.string().required()    // query 형태로 해당 키 값에 대한 타입 유효성 검사
  })
};

const checkEmail = {
  query: Joi.object().keys({
   email: Joi.string().email().required()    // query 형태로 해당 키 값에 대한 타입 유효성 검사
  })
};

const checkNicknameAndEmailAndCode = {
  query: Joi.object().keys({
    email: Joi.string().email().required(),
    code: Joi.string().required(),

  })
};

const checkNewPasswordAndOldPassword = {
  body: Joi.object().keys({
    newPassword: Joi.string().required(),
    oldPassword: Joi.string().required()

  })
};


const checkIdentifierAndEmail = {
  body: Joi.object().keys({
    identifier: Joi.string().required(),
    email: Joi.string().email().required()

  })
};


const checkOganization = {
  params: Joi.object().keys({
    organization: Joi.string().required()
  

  })
};


const checkOganizationAndMyPageAllData = {
  params: Joi.object().keys({
    organization: Joi.string().required()
  
  }),
  body: Joi.object().keys({
    nickname: Joi.string().required(),
    accountNumber: Joi.string().required(),
    company: Joi.string().required(),
    hireDate: Joi.date().required(),
    job: Joi.string().required(),
    jobIntroduce: Joi.string().required(),
    companyPublic: Joi.boolean().required()

  
  }),
};
export default {

    checkIdentifier,
    checkNicknameAndEmailAndCode,
    checkNewPasswordAndOldPassword,
    checkEmail,
    checkIdentifierAndEmail,
    checkOganization,
    checkOganizationAndMyPageAllData
};
