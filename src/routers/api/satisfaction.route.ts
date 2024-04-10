import express from 'express';
import  { endController } from '../../controllers/index.js';
import {  endValidation } from '../../validations/index.js';
import validate from '../../middlewares/validate.js';
import auth from '../../middlewares/auth.js';


const router = express.Router();




export default router;
