import express from 'express';
import * as PlannerController from '../../controllers/plannerController.js'
import auth from "../../middlewares/auth.js";
const router = express.Router();



router.get('/calendar',auth,PlannerController.getPlannerData);
router.get('/history',auth,PlannerController.getUserChallengeHistory);
router.get('/statistic',auth,PlannerController.getUserStatistics);
router.get('/user-challenge',auth,PlannerController.getUserChallenge);
router.get('/user-challenge-template/:challenge',auth,PlannerController.getUserChallengeTemplate);

export default router