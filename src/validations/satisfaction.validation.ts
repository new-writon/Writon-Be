import Joi from 'joi';



const checkObjectiveAnswer = {
    body: Joi.object().keys({
        challengeId: Joi.number().required(),
        organization: Joi.string().required(),
        satisfationAnswer: Joi.array().required()
    })
};


const checkReEngagement = {
    body: Joi.object().keys({
        challengeId: Joi.number().required(),
        organization: Joi.string().required(),
   
    })
};

const checkChallengeReEngagement = {
    body: Joi.object().keys({
        challengeId: Joi.number().required(),
    })
};

export default {

    checkObjectiveAnswer,
    checkReEngagement,
    checkChallengeReEngagement
};
