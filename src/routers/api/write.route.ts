import express from 'express';
import {writeController} from '../../controllers/index.js'
import auth from '../../middlewares/auth.js';




const router = express.Router();


router.post('/', auth, writeController.writeChallenge);
router.get('/start/:name', auth,writeController.newChallenge);
router.get('/:challengeName', auth, writeController.selectTemplate);
router.post('/planner/temporary-storage', auth, writeController.plannerTemporaryChallenge);
router.post('/temporary-storage', auth, writeController.insertTemporaryChallenge);
router.post('/register', auth, writeController.insertChallengeComplete);



export default router