import Router from 'koa-router';
import axios from './utils/axios'
import Poi from '../dbs/models/pol'

let router = new Router({prefix:'/search'})

const sign = 'fjy'

 // 
router.get('/top',async(ctx)=>{
  
  // 获取第三方线上数据
  let {status,data:{top}} = await axios.get('http://cp-tools.cn/search/top',{
    params:{
      input:ctx.query.input,
      city:ctx.query.city,
      sign
    }
  })
  ctx.body = {
    top:status === 200 ? top : []
  }
})

// 获取热点搜索
router.get('/hotPlace',async(ctx)=>{
   // 获取当前城市名称，vuex 客户端与服务端数据是共享的状态，首先需要判断一下ctx.store ,会存在信息不同步问题
  let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  let {status,data:{result}} = await axios.get('http://cp-tools.cn/search/hotPlace',{
    params:{
      sign,
      city// 中文状态需要进行编码，与第三方协同解码 encodeURIComponent(city)
    }
  })
  ctx.body = {
    result: status === 200 ? result : []
  }
})

// 获取关键字信息
router.get('/resultsByKeywords',async (ctx)=>{
  const {city,keyword} = ctx.query;
  let {status,data:{count,pois}} = await axios.get('http://cp-tools.cn/search/resultsByKeywords',{
    params:{
      city,
      keyword,
      sign
    }
  })
  ctx.body = {
    count: status === 200 ? count : 0,
    pois: status ===200 ? pois : []
  }
})

// 获取详情页信息
router.get('/products',async(ctx)=>{
  let keyword = ctx.query.keyword || '旅游'
  let city = ctx.query.city || '北京'
  let {status,data:{product,more}} = await axios.get('http://cp-tools.cn/search/products',{
    params:{
      keyword,
      city,
      sign
    }
  })
  // isAuthenticated 判断当前连接用户时候时登陆状态
  if(status === 200 ){
    ctx.body = {
      product,
      moren: ctx.isAuthenticated() ? more : [],
      login: ctx.isAuthenticated()
    }
  }else{
    ctx.body = {
      product:{},
      moren: ctx.isAuthenticated() ? more : [],
      login: ctx.isAuthenticated()
    }
  }
})
export default router