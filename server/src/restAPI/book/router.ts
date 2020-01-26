import Router from 'koa-router';
import save from './save';

const router = new Router();

router.post('/save', save);
router.get('/save', save);

export default router;
