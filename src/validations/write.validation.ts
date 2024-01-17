
import Joi from 'joi';


const checkChallengeId = {
    params: Joi.object().keys({

        challengeId: Joi.number().required()

    })
};


export default {
    checkChallengeId

};
