import { Router } from 'express';
import USER_ROUTER from './user.js';
import TRIP_ROUTER from './trip.js';
import AUTH_ROUTER from './auth.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Wander Wise API' });
});

router.use('/users', USER_ROUTER);

export default router;