
import Joi from 'joi';


const checkOrganization = {
    query: Joi.object().keys({
        organization: Joi.string().required()    

  })
};



export default {

    checkOrganization
};
