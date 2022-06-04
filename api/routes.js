import Router from '@koa/router';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

// Iniciaaliza o cliente do Prisma
const prisma = new PrismaClient();

// Exportando rotas para outros arquivos
export const router = new Router();

// Carrega varios usuários
router.get('/tweets', async ctx =>{
    const tweets = await prisma.tweet.findMany();
    ctx.body = tweets;
})

// Cria um Tweet
router.post('/tweets', async ctx =>{
   const tweet = await prisma.tweet.create({
       data: {
            userId: 'cl3z6c6ik002534td2kzd7n70',
            text: ctx.request.body.text
       }
   })

   ctx.body = tweet;   
})

// Login de usuario
router.get('/login', async ctx =>{
    // Pegando do header o email e senha
    const [, token] = ctx.request.header.authorization.split(' ');
    const [email, plainTextpassword ] = Buffer.from(token, 'base64').toString().split(':');
    
    // Buscando o usuario no banco
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if(!user){
        ctx.body = 404
        return
    }

    // Verificando se a senha está correta
    const passwordMatch = bcrypt.compareSync(plainTextpassword, user.password);

    if(passwordMatch){
        ctx.body = {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
        };
    
        return
    }

    ctx.body = 404

});

//Cadastra um usuário
router.post('/signup', async ctx =>{
    const saltRounds = 10;
    const password = bcrypt.hashSync(ctx.request.body.password, saltRounds); //criptografa a senha
    
    try {
        const user = await prisma.user.create({
            data:{
                name: ctx.request.body.name,
                username:ctx.request.body.username,
                email: ctx.request.body.email,
                password: password,
            }
        });

        ctx.body = {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
        };
    
    } catch (error) {
        if(error.meta && !error.meta.target){
            ctx.status = 422
            ctx.body = "Email ou nome de usuario já existe!";
            return 
        }

        ctx.status = 500;
        ctx.body = "Internal server error";
    }
    
})