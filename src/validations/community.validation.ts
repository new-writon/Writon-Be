
import Joi from 'joi';

const checkChallengeIdAndOrganizationAndContent = {
  body: Joi.object().keys({
    organization: Joi.string().required(),
    challengeId: Joi.number().required(),
    content: Joi.string().required()

  })
};


const checkChallengeIdAndDateAndOrganization = {
  params: Joi.object().keys({
    challengeId: Joi.number().required(),
    date: Joi.string().required(),
    organization: Joi.string().required()

  })
};


const checkUserTemplateId = {
  params: Joi.object().keys({
    userTemplateId: Joi.number().required(),

  })
}

const checkUserTemplateIdAndOrganization = {
  body: Joi.object().keys({
    userTemplateId: Joi.number().required(),
    organization: Joi.string().required()

  })
}







export default {

  checkChallengeIdAndOrganizationAndContent,
  checkChallengeIdAndDateAndOrganization,
  checkUserTemplateId,
  checkUserTemplateIdAndOrganization

};
