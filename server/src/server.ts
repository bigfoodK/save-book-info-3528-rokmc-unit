import Koa from 'koa';
import Http from 'http';
import Config from './serverConfig';
import KoaBodyParser from 'koa-bodyparser';
import logger from './logger';
import router from './router';
import initialize from './initialize';

const app = new Koa();
app.use(logger);
app.use(KoaBodyParser());
app.use(router.routes());

const httpServer = Http.createServer(app.callback());

async function start() {
  await initialize();

  httpServer.listen(Config.http.port, undefined, undefined, () => {
    const date = new Date();
    console.log(`http server running on ${Config.http.port} [${date.toLocaleString()}]`);
  });
}

start();
