import express from 'express';
import { userController } from '../../controllers/index.js';
import { userValidation } from '../../validations/index.js';
import validate from '../../middlewares/validate.js';
import auth from '../../middlewares/auth.js';


const router = express.Router();


router.get('/idenfitier-find', validate(userValidation.checkNicknameAndEmailAndCode), userController.findIdentifier);
router.patch('/password-change', validate(userValidation.checkNewPasswordAndOldPassword), auth, userController.changePassword);
router.get('/check-identifier', validate(userValidation.checkIdentifier), userController.checkIdentifier);
router.get('/check-email', validate(userValidation.checkEmail), userController.checkEmail);
router.patch('/generate-temporary-password', validate(userValidation.checkIdentifierAndEmail), userController.generateTemporaryPassword);




export default router;

