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
  console.log(ctx.store,city)
  let {status,data:{result}} = await axios.get('http://cp-tools.cn/search/hotPlace',{
    params:{
      sign,
      // city:encodeURIComponent(city)// 中文状态需要进行编码，与第三方协同解码
      city
    }
  })
  ctx.body = {
    result: status === 200 ? result : []
  }
})

export default router