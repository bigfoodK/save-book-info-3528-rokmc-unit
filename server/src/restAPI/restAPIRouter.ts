import Router from 'koa-router';
import Book from './book';

const router = new Router();

router.use('/book', Book.router.routes());

export default router;
