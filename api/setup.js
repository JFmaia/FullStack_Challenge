import Koa from 'koa' //Servidor Http
import { router } from './routes.js' //Rotas da api';

export const app = new Koa();

app.use(router.routes());
app.use(router.allowedMethods());
