import Router from 'koa-router';
import save from './save';
import show from './show';

const router = new Router();

router.post('/save', save);
router.get('/save', save);
router.post('/show', show);

export default router;
