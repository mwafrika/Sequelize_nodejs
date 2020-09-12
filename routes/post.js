import {Router} from 'express';
import posts from '../../backend/controllers/post';
import auth from '../middleware/auth';
const router = Router()

.post('/item',auth, posts.Item)
.get('/item',auth, posts.ItemGet)
.get('/items', auth, posts.getAll)

export default router;