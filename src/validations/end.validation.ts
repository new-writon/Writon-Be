
import Joi from 'joi';

const checkChallengeIdAndOrganization = {
  params : Joi.object().keys({
    organization: Joi.string().required(),
    challengeId: Joi.number().required()


  })
};





export default {


    checkChallengeIdAndOrganization
};
