import Koa from 'koa';
import Http from 'http';
import Config from './serverConfig';
import logger from './logger';
import router from './router';

const app = new Koa();
app.use(logger);
app.use(router.routes());

const httpServer = Http.createServer(app.callback());

httpServer.listen(Config.http.port, undefined, undefined, () => {
  const date = new Date();
  console.log(`http server running on ${Config.http.port} [${date.toLocaleString()}]`);
});
