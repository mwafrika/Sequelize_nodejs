import {Router} from 'express';
import userRoute from '../../backend/controllers/user';
const router = Router()

.get('/signup', userRoute.getSignup)
.post('/signup', userRoute.signup)
.get('/login', userRoute.getLogin)
.post('/login', userRoute.login)
.get('/logout', userRoute.logout)

export default router;