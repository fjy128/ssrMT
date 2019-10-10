import Router from 'koa-router';
import Redis from 'koa-redis';
import nodeMailer from 'nodemailer';
import User from '../dbs/models/users';
import Passport from './utils/passport';
import Email  from '../dbs/config'
import axios from './utils/axios'

let router = new Router({
  prefix:'/users',//接口前缀
})

// 获取redis客户端
let Store = new Redis().client

//注册
router.post('/signup', async (ctx) => {
  try {
    const { username, password, email, code } = ctx.request.body
    //校验是否有验证码
    if (code) {
      const saveCode = await Store.hget(`nodemail:${username}`, 'code')
      const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
      console.log(code, saveCode, saveExpire)
      if (code === saveCode) {
        if (new Date().getTime() - saveExpire > 0) {
          ctx.body = {
            code: -1,
            msg: '验证码已过期，请重新尝试'
          }
          return false
        }
      } else {
        ctx.body = {
          code: -1,
          msg: '请填写有效的验证码'
        }
        return;
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请填写验证码'
      }
      return;
    }

    // 链接数据库查找该用户名是否被注册
    let user = await User.find({ username });
    if (user.length) {
      ctx.body = {
        code: -1,
        msg: '你已被注册'
      }
      return
    }

    //把用户的信息存放进数据内
    let nuser = await User.create({ username, password, email })

    //检查有没有成功写库，如果有，成功之后进行登陆的动作
    if (nuser) {
      let res = await axios.post('/users/signin', { username, password })
      console.log(res.data, 2222)
      if (res.data && res.data.code === 0) {
        ctx.body = {
          code: 0,
          msg: '注册成功',
          user: res.data.user
        }
      } else {
        ctx.body = {
          code: -1,
          msg: 'error'
        }
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '注册失败'
      }
    }
  } catch (err) {
    console.log(err)
  }
})

// 登陆
router.post('/signin',async(ctx,next)=>{
  return Passport.authenticate('local', function (err, user, info, status) { //做验证
    console.log(err, user, info,status,'登陆接口')
    if(err){
      ctx.body = {
        code:-1,
        msg:err
      }
    }else{
      if(user){
        ctx.body = {
          code:0,
          msg:'登陆成功',
          user
        }
        return ctx.login(user)
      }else{
        ctx.body = {
          code:1,
          msg:info
        }
      }
    }
  })(ctx,next)
})

// 获取验证码
router.post('/verify',async(ctx,next)=>{
  let username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
  if(saveExpire && new Date().getTime()-saveExpire<0){
    ctx.body = {
      code:-1,
      msg:'验证请求过于频繁，1分钟内1次'
    }
  }
  let transporter = nodeMailer.createTransport({
    host:Email.smtp.host,
    port:587,
    auth:{
      user:Email.smtp.user,
      pass:Email.smtp.pass
    }
  })
  let ko = {
    code:Email.smtp.code(),
    expire:Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username,
  }
  let mailOptions = {
    from:`"认证邮件"<${Email.smtp.user}>`,
    to:ko.email,
    subject:'注册码',
    html:`你的邀请码是${ko.code}`
  }
  await transporter.sendMail(mailOptions,(error,info)=>{
    if(error){
      return console.log('error')
    }else{
      Store.hmset(`nodemail:${ko.user}`,'code',ko.code,'expire',ko.expire,'email',ko.email)

    }
  })
  ctx.body = {
    code:0,
    msg:'验证码已发送，可能会有延迟，有效期1分钟'
  }
})

// 退出
router.get('/exit',async(ctx,next)=>{
  await ctx.logout()
  if(!ctx.isAuthenticated()){
    ctx.body = {
      code:0
    }
  }else{
    ctx.body = {
      code:-1,
    }
  }
})

// 获取用户信息
router.get('/getUser',async(ctx)=>{
  if(ctx.isAuthenticated()){
    const{username,email} = ctx.session.passport.user
    ctx.body = {
      user:username,
      email
    }
  }else{
    ctx.body = {
      user:'',
      email:''
    }
  }
})

export default router