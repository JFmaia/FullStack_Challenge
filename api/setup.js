import Koa from 'koa' //Servidor Http
import { router } from './routes.js' //Rotas da api';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

export const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
