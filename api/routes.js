import Router from '@koa/router';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const router = new Router();


router.get('/tweets', async ctx =>{
    const tweets = await prisma.tweet.findMany();
    ctx.body = tweets;
})

router.post('/tweets', async ctx =>{
   const tweet = {
        userId: 'cl3z6c6ik002534td2kzd7n70',
        text: ctx.request.body.text
   }

   const doc = await prisma.tweet.create({
       data: tweet,
   })

   ctx.body = doc;   
})