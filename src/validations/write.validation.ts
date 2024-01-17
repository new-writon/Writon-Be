
import Joi from 'joi';


const checkChallengeId = {
    params: Joi.object().keys({
        challengeId: Joi.number().required()
    })
};


const checkWrite = {
    body: Joi.object().keys({
        challengeId: Joi.number().required(),
        organization: Joi.string().required(),
        date: Joi.string().required(),
        templateContent: Joi.array().required()
    })
};

export default {
    checkChallengeId,
    checkWrite

};
