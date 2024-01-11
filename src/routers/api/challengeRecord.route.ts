import express from 'express';
import  {authController} from '../../controllers/index.js';
import { authValidation } from '../../validations/index.js';
import validate from '../../middlewares/validate.js';



const router = express.Router();


router.get('/present-situation');
router.get('/calendar');
router.get('/reminiscence');

export default router;