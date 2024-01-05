import express from 'express';
import challengeRoute from './challenge.route.js';
import plannerRoute from './planner.route.js';
import writeRoute from './write.route.js';
import userRoute from './user.route.js'; 
import authRoute from './auth.route.js'; 


const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute

  },
  {
    path: '/challenge',
    route: challengeRoute
  },
  {
    path: '/user',
    route: userRoute
  },
  // {
  //   path: '/profile',
  //   route: profileRoute
  // },
  {
    path: '/planner',
    route: plannerRoute
  },
  {
    path: '/write',
    route: writeRoute
  }
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
