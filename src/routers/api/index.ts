import express from 'express';
import userRoute from './user.route.js'; 
import authRoute from './auth.route.js'; 
import challengeRecordRoute from './challengeRecord.route.js';


const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute

  },

  {
    path: '/user',
    route: userRoute
  },
  
  {
    path: '/challenge-record',
    route: challengeRecordRoute
  },
];




defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
// if (config.env === 'development') {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

export default router;
