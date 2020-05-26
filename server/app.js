const Koa = require('koa');
const cors = require('koa2-cors');
const router = require('./routers/index')
// 创建一个Koa对象表示web app本身:
const app = new Koa();
app.use(cors());//解决跨域问题
// 对于任何请求，app将调用该异步函数处理请求：

// app.use(cors({
//     origin:'*',
//     // credentials:true
// }))  




// app.use(cors({
//     origin: function(ctx) {
//       if (ctx.url === '/test') {
//         return false;
//       }
//       return '*';
//     }}))

app.use(async (ctx, next) => {
    // ctx.set("Access-Control-Allow-Origin", "*");
    // ctx.set("Access-Control-Allow-Headers", "Content-type, Content-length, Accept");
    // ctx.set("Access-Control-Allow-Methods", "PUT, GET, DELETE,POST, OPTIONS");
    console.log(ctx.request.path + ':' + ctx.request.method);
    await next();
});
app.use(router.routes());
app.listen(3001);
console.log('app started at port 3001...');