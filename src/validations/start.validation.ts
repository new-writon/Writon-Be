
import Joi from 'joi';


const checkOrganizationEnroll = {
    body: Joi.object().keys({
        organization: Joi.string().required(),
        nickname: Joi.string().required(),
        job: Joi.string().required(),
        jobIntroduce: Joi.string().required(),
        hireDate: Joi.string().required(),
        company: Joi.string().required(),
        companyPublic: Joi.boolean().required(),

    })
};

const checkOrganizationAndChallengeId = {
    body: Joi.object().keys({
        organization: Joi.string().required(),
        challengeId: Joi.number().required()

    })
};


const checkOrganizationAndNickname = {
    params: Joi.object().keys({
        organization: Joi.string().required(),
    
    }),
    query: Joi.object().keys({
        nickname: Joi.string().required(),
    
    })
};

export default {

    checkOrganizationEnroll,
    checkOrganizationAndChallengeId,
    checkOrganizationAndNickname
};
