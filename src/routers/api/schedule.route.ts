import express from 'express';
import  { recordController, scheduleController } from '../../controllers/index.js';
import { recordValidation } from '../../validations/index.js';
import validate from '../../middlewares/validate.js';
import auth from '../../middlewares/auth.js';


const router = express.Router();

router.post('/', scheduleController.scheduleChallenge);


export default router;