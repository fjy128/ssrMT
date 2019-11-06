import Router from 'koa-router';
import axios from './utils/axios'
import Cart from '../dbs/models/cart'
import Order from '../dbs/models/order'
import md5 from 'crypto-js/md5'

let router = new Router({ prefix: '/order'})

router.post('/createOrder',async ctx=>{
  let {id, price, count} = ctx.request.body;
  let time = Date();
  let orderID = md5(Math.random()*1000 + time).toString();
  console.log(ctx.isAuthenticated())
  if(!ctx.isAuthenticated()){
    ctx.body = {
      code:-1,
      msg:'please login'
    }
  }else{
    let findCart = await Cart.findOne({id:id});
    // zhelimeiyou yanjinpanduan
    let order = new Order({
      id:orderID,
      count,
      total:price*count,
      time,
      user:ctx.session.passport.user,
      name:findCart.detail[0].name,
      imgs:findCart.detail[0].imgs,
      status:0
    })
    // 入库
    try{
      let result = await order.save();
      if(result){
        await findCart.remove();//订单成立，购物车清掉
        ctx.body = {
          code:0,
          id:orderID
        }
      }else{
        ctx.body = {
          code:-1,
        }
      }
    }catch(e){
      ctx.body = {
        code:-1,
      }
    }
  }
})

//  查看订单
router.post('/getOrders', async ctx =>{
  if(!ctx.isAuthenticated()){
    ctx.body ={
      code:-1,
      list:[],
      msg:'please login'
    }
  }else{
    try{
      let result = await Order.find()
      if(result){
        ctx.body ={
          code:0,
          list:result,
          msg:'succes'
        }
      }else{
        ctx.body ={
          code:-1,
          list:[],
          msg:'fail'
        }
      }
    }catch(e){
      ctx.body ={
        code:-1,
        list:[],
        msg:'fail'
      }
    }
  }
})

export default router