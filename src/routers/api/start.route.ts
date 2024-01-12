

import express from 'express';
import  { recordController } from '../../controllers/index.js';
import { recordValidation } from '../../validations/index.js';
import validate from '../../middlewares/validate.js';
import auth from '../../middlewares/auth.js';


const router = express.Router();




export default router;


