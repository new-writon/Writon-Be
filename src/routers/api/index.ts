import express from 'express';
import userRoute from './user.route.js'; 
import authRoute from './auth.route.js'; 
import recordRoute from './record.route.js';
import startRoute from './start.route.js';
import writeRoute from './write.route.js';

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
    path: '/challenge/record',
    route: recordRoute
  },
  {
    path: '/challenge/start',
    route: startRoute
  },
  {
    path: '/challenge/write',
    route: writeRoute
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
