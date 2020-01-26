import Router from 'koa-router';
import restAPIRouter from './restAPI/restAPIRouter';
import servePublic from './servePublic';

const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.redirect('/index.html');
});

router.use('/restAPI', restAPIRouter.routes());

router.get('/:path*', servePublic);

export = router;
