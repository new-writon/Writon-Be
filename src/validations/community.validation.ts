
import Joi from 'joi';

const checkChallengeIdAndOrganizationAndContent = {
    body: Joi.object().keys({
      organization: Joi.string().required(),
      challengeId: Joi.number().required(),
      content: Joi.string().required()
  
    })
  };


  const checkChallengeIdAndDate = {
    params: Joi.object().keys({
      challengeId: Joi.number().required(),
      date: Joi.string().required()
  
    })
  };

export default {

  checkChallengeIdAndOrganizationAndContent,
  checkChallengeIdAndDate

};