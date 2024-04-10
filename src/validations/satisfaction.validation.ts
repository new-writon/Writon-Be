import Joi from 'joi';



const checkObjectiveAnswer = {
    body: Joi.object().keys({
        challengeId: Joi.number().required(),
        organization: Joi.string().required(),
        satisfationAnswer: Joi.array().required()
    })
};

export default {

    checkObjectiveAnswer
};
