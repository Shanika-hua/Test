const koaBody = require('koa-body');
const router = require('koa-router')();
const User = require('../model/user');


router.get('/user', async (ctx, next) => {
    // const user = await User.findAll({
    //     where: {isdelete: 0},
    // })
    const user = await User.findAll();
    ctx.body = user;
});

//存到数据库中
router.post('/user', koaBody(), async (ctx) => {
    const user = await User.build(ctx.request.body).save();
    ctx.body = user;

})


router.put('/user/:id', koaBody(), async (ctx) => {
    // ctx.set("Access-Control-Allow-Origin", "*");
    // ctx.set("Access-Control-Allow-Headers", "Content-type, Content-length, Accept");
    // ctx.set("Access-Control-Allow-Methods", "PUT, GET, DELETE,POST, OPTIONS");
    // ctx.set("Access-Control-Allow-Credentials", true);
    const body = ctx.request.body;
    const user = await User.findById(ctx.params.id);
    await user.update({...body})
    ctx.body = user;
})

router.delete('/user/:id', async (ctx) => {
    ctx.set("Access-Control-Allow-Origin", "*");
        ctx.set("Access-Control-Allow-Headers", "Content-type, Content-length, Accept");
        ctx.set("Access-Control-Allow-Methods", "PUT, GET, DELETE,POST, OPTIONS");
    // ctx.set("Access-Control-Allow-Origin", "*");
    // ctx.set("Content-Type", "application/json;charset=utf-8");
    //  const user = await User.findById(ctx.params.id).then((user) => user);
    // user.isdelete = 1;
    // user.destroy();
    // await user.save();
    const user = await User.destroy({where:{id: ctx.params.id}})
    // ctx.body = {success: true}

});
router.post('/user-search', koaBody(), async (ctx) => {
    const body = ctx.request.body;
    const user = await User.findAndCount({
        // where: {
        //     isdelete: 0, username: {
        //         $like: `%${body.search}%`
        //     }
        // },
        where:{
            username:{
                $like : `%s{body.search}`
            }
        }
        // limit: body.limit,
        // offset: body.offset
        // where:{
        //     username:'shanika6',
        //     address:'泰鹏大厦6'
        // }
    });
    ctx.body = user;
});

module.exports = router;