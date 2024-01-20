import express from 'express';
import  {authController} from '../../controllers/index.js';
import { authValidation } from '../../validations/index.js';
import validate from '../../middlewares/validate.js';
import auth from '../../middlewares/auth.js';



const router = express.Router();

router.post('/login/local', validate(authValidation.checkLocalLogin), authController.localLogin);
router.post('/login/kakao', validate(authValidation.checkKakaoLogin), authController.kakaoLogin);
router.delete('/logout', auth, authController.logout);
router.post('/token-reissue', authController.reissueToken);
router.post('/signup', validate(authValidation.checkSignUp), authController.signup);
router.post('/verify/email-code', validate(authValidation.checkCode), authController.verifyAuthCode);
router.post('/generate/email-code', validate(authValidation.checkEmail), authController.generateAuthCode);



export default router;

