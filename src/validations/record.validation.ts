
import Joi from 'joi';


const checkChallengeIdAndOrganization = {
    params: Joi.object().keys({
        challengeId: Joi.number().required(),
        organization: Joi.string().required()

    

  })
};

const checkChallengeId = {
    params: Joi.object().keys({
        challengeId: Joi.number().required(),

  })
};

const checkOrganization = {
    query: Joi.object().keys({
        organization: Joi.string().required()    

  })
};

const checkChallengeIdAndMonthAndOrganization = {
    params: Joi.object().keys({
        challengeId: Joi.number().required(),
        month: Joi.string().required(),
        organization: Joi.string().required()    

  })
};



const checkChallengeIdAndDate = {
    params: Joi.object().keys({
        challengeId: Joi.number().required(),
        date: Joi.string().required()

  })
};
export default {

    checkChallengeIdAndOrganization,
    checkOrganization,
    checkChallengeIdAndMonthAndOrganization,
    checkChallengeId,
    checkChallengeIdAndDate
};
