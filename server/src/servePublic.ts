import Koa from 'koa';
import Path from 'path';
import Config from './serverConfig';
import { getFileStatAsync, sendFile } from './commonUtils';

const rootDir = Config.publicDirectory;

export default async function servePublic(ctx: Koa.Context, next: () => Promise<any>) {
  const normalizedPath = Path.normalize(ctx.params.path || '/');
  const isUpperPath = normalizedPath.startsWith('../') || normalizedPath.startsWith('..\\') || normalizedPath === '..';

  if(isUpperPath) {
    ctx.status = 403;
    return;
  }

  const filePath = Path.join(rootDir, normalizedPath);
  const stat = await getFileStatAsync(filePath);

  if(!stat || stat.isDirectory()) {
    ctx.status = 404;
    return;
  }

  sendFile(ctx, filePath, stat.size, false);
}
