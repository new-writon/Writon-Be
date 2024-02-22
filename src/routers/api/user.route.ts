import express from 'express';
import { userController } from '../../controllers/index.js';
import { userValidation } from '../../validations/index.js';
import validate from '../../middlewares/validate.js';
import auth from '../../middlewares/auth.js';


const router = express.Router();


router.get('/idenfitier/find', validate(userValidation.checkNicknameAndEmailAndCode), userController.findIdentifier);
router.patch('/password/change', validate(userValidation.checkNewPasswordAndOldPassword), auth, userController.changePassword);
router.get('/identifier/check', validate(userValidation.checkIdentifier), userController.checkIdentifier);
router.get('/email/check', validate(userValidation.checkEmail), userController.checkEmail);
router.patch('/temporary-password/generate', validate(userValidation.checkIdentifierAndEmail), userController.generateTemporaryPassword);
router.get('/:organization/my-profile', auth, validate(userValidation.checkOganization), userController.selectUserMyPage);
router.put('/:organization/my-profile', auth, validate(userValidation.checkOganizationAndMyPageAllData), userController.updateUserMyPage);



export default router;

