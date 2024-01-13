
import Joi from 'joi';


const checkChallengeId = {
    params: Joi.object().keys({
        challengeId: Joi.number().required()    

  })
};

const checkOrganization = {
    query: Joi.object().keys({
        organization: Joi.string().required()    

  })
};


export default {

    checkChallengeId,
    checkOrganization
};
