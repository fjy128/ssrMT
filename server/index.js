// const Koa = require('koa')
import Koa from 'koa'
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')


import mongoose from 'mongoose'
import bodyParser from 'koa-bodyparser'
import session from 'koa-generic-session'
import Redis from 'koa-redis'
import json from 'koa-json'
import dbConfig from './dbs/config'
import passport from './interface/utils/passport'
import cors from 'koa2-cors'
import users from './interface/users'
import geo from './interface/geo'
import search from './interface/search'
import categroy from './interface/categroy'
import cart from './interface/cart'
import order from './interface/order'



const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.keys = ['mt','keyskeys']//密钥
app.proxy = true//一定要写
app.use(cors()); //允许跨域
app.use(session({ key:'mt',prefix:'mt:uid',store:new Redis()}))//存储
app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}))
app.use(json())

mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
}) //连数据库

app.use(passport.initialize())
app.use(passport.session())

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    debugger
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    debugger
    await nuxt.ready()
  }

  // 路由注入
  app.use(users.routes()).use(users.allowedMethods())
  app.use(geo.routes()).use(geo.allowedMethods())
  app.use(search.routes()).use(search.allowedMethods())
  app.use(categroy.routes()).use(categroy.allowedMethods())
  app.use(cart.routes()).use(cart.allowedMethods())
  app.use(order.routes()).use(order.allowedMethods())
  app.use((ctx) => {
    ctx.status = 200

     return new Promise((resolve, reject) => {
       ctx.res.on('close', resolve)
       ctx.res.on('finish', resolve)
       nuxt.render(ctx.req, ctx.res, promise => {
         // nuxt.render passes a rejected promise into callback on error.
         promise.then(resolve).catch(reject)
       })
     })
    // ctx.respond = false // Bypass Koa's built-in response handling
    // ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    // nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
