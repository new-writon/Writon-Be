
import Joi from 'joi';


const checkaffiliationsId = {
    params: Joi.object().keys({
        affiliationsId: Joi.string().required()    

  })
};

const checkOrganization = {
    query: Joi.object().keys({
        organization: Joi.string().required()    

  })
};


export default {

    checkaffiliationsId,
    checkOrganization
};
