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
router.get('/:organization/:challengeId/writing-comment', auth, validate(userValidation.checkOganizationAndChallengeId), userController.selectCommentInformation);
router.get('/:organization/my-profile', auth, validate(userValidation.checkOganization), userController.selectUserMyPage);
router.put('/:organization/my-profile', auth, validate(userValidation.checkOganizationAndMyPageAllData), userController.updateUserMyPage);
router.patch('/account-number', auth, validate(userValidation.checkAccountNumberAndBank), userController.updateAccountInformation);
router.put('/my-posting', auth, validate(userValidation.checkUserTemplateIdAndTemplateContent), userController.updateMyPosting);
router.get('/:organization/:challengeId/check-count', auth,  validate(userValidation.checkOganizationAndChallengeId), userController.getCheckCount);
router.patch('/:organization/:challengeId/check-count', auth,  validate(userValidation.checkOganizationAndChallengeIdAndCheckCount), userController.updateCheckCount);
router.patch('/check-comment', auth,  validate(userValidation.checkCommentId), userController.signComment);
router.patch('/check-like', auth,  validate(userValidation.checkLikeId), userController.signLike);
router.get('/:organization/:challengeId/notify', auth,  validate(userValidation.checkOganizationAndChallengeId), userController.getNotify);


export default router;

