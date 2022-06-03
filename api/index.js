import Koa from 'koa' //Servidor Http

const app = new Koa();

app.use(ctx =>{
    ctx.body = 'hello world'
});

app.listen(9901, ()=> console.log("Server is running at 9901"));