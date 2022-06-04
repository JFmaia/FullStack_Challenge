import Router from '@koa/router';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const router = new Router();


router.get('/tweets', async ctx =>{
    const tweets = await prisma.tweet.findMany();
    ctx.body = tweets;
})

router.post('/tweets', async ctx =>{
   const tweet = await prisma.tweet.create({
       data: {
            userId: 'cl3z6c6ik002534td2kzd7n70',
            text: ctx.request.body.text
       }
   })

   ctx.body = tweet;   
})

router.post('/signup', async ctx =>{
    const user = await prisma.user.create({
        data:{
            name: ctx.request.body.name,
            username:ctx.request.body.username,
            email: ctx.request.body.email,
            password: ctx.request.body.password,
        }
    });

    ctx.body = user;

})