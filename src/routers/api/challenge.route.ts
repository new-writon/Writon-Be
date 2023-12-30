import express from 'express';
import { challengeController } from '../../controllers/index.js'
import  auth  from '../../middlewares/auth.js';




const router = express.Router();

router.get('/', challengeController.beforeMain);
router.post('/main', auth, challengeController.afterMain);
router.get('/search', challengeController.challengeSearch)




export default router