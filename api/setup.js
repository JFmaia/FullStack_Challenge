import Koa from 'koa';
import { router } from './routes.js';
import bodyParser from 'koa-bodyparser';

export const app = new Koa();

app.use(bodyParser())
app.use(router.routes());
app.use(router.allowedMethods());