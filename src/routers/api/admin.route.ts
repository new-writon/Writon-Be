import express from 'express';
import  {authController} from '../../controllers/index.js';
import { authValidation } from '../../validations/index.js';
import validate from '../../middlewares/validate.js';
import auth from '../../middlewares/auth.js';



const router = express.Router();

router.post('/login/local', validate(authValidation.checkLocalLogin), authController.localLogin);




export default router;

