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
    const body = ctx.request.body;
    const user = await User.findById(ctx.params.id);
    await user.update({...body})
    ctx.body = user;
})

router.delete('/user/:id', async (ctx) => {
   
    // user.destroy();
    // await user.save();
    const user = await User.destroy({where:{id: ctx.params.id}})
    ctx.body = user

});
router.post('/user-search', koaBody(), async (ctx) => {
    const body = ctx.request.body;
    const user = await User.findAndCount({
        // limit:4,
        // offset:0,
        where:{
            $or:[
                {username:{$like : `%${body.value}%`} }, 
                {age:{$like : `%${body.value}%`} }, 
                {address:{$like : `%${body.value}%`} }
            ]
        }
        // limit: body.limit,
        // offset: body.offset
        // where:{
        //     username:'shanika6',
        //     // address:'泰鹏大厦6'
        // }
    });
    ctx.body = user;
});

module.exports = router;