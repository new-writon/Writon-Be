
import Joi from 'joi';

const checkOrganizationAndChallengeAndEmail = {
    body: Joi.object().keys({
      organization: Joi.string().required(),
      challenge: Joi.string().required(),
      email: Joi.array().required()

  
    })
  };

export default {
    checkOrganizationAndChallengeAndEmail
};
