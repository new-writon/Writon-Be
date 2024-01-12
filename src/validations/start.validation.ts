
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



export default {

    checkOrganizationEnroll
};
