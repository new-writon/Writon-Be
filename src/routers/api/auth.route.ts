import express from 'express';
import  {authController} from '../../controllers/index.js';
import { authValidation } from '../../validations/index.js';
import validate from '../../middlewares/validate.js';
import auth from '../../middlewares/auth.js';



const router = express.Router();

router.post('/local-login', validate(authValidation.checkLocalLogin), authController.localLogin);
router.post('/kakao-login', authController.kakaoLogin);
router.delete('/logout', auth, authController.logout);
router.post('/reissue-token', authController.reissueToken);
router.post('/signup', validate(authValidation.checkSignUp), authController.signup);
router.post('/verify-email-code', validate(authValidation.checkCode), authController.verifyAuthCode);
router.post('/generate-email-code', validate(authValidation.checkEmail), authController.generateAuthCode);



export default router;

