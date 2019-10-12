import Router from 'koa-router';
import axios from './utils/axios'
import Province from '../dbs/models/province'

let router = new Router({prefix:'/geo'})

const sign = 'fjy'//签名

// 获取当前城市
router.get('/getPosition', async (ctx) => {
  let {status,data: {province,city}} = await axios.get(`http://cp-tools.cn/geo/getPosition`)
  console.log(status, province)
  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})
// 查询省份
router.get('/province',async(ctx)=>{
  // 下面只操作本地的数据 只是部分数据，前提需要引入数据表 dbs/models/Province,才可以调用Province.find()
  // let province = await Province.find()
  // ctx.body = {
  //   province:province.map(item=>{
  //     return{
  //       id:item.id,
  //       name:item.value[0]
  //     }
  //   })
  // }

  // 下面代码操作的是远程第三方数据，获取全国数据
  let {status, data: { province}} = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}  `)
  ctx.body = { province: status === 200 ? province: [] }
})

// 查询单个省份城市
router.get('/province/:id',async (ctx)=>{
  let {status,data:{city}} = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}?sign=${sign}`)
  ctx.body = { city: status === 200 ? city : [] }
})

// 获取城市
router.get('/city',async(ctx)=>{
  let {status,data:{city}} = await axios.get(`http://cp-tools.cn/geo/city?sign=${sign}`)
  ctx.body = {city:status === 200 ? city : []}
})
// 获取热门城市
router.get('/hotCity',async (ctx)=>{
  let {status,data:{hots}} = await axios.get(`http://cp-tools.cn/geo/hotCity?sign=${sign}`)
  ctx.body = { hots: status === 200 ? hots : [] }
})

// 获取当前城市天气
router.get('/weather', async (ctx) => {
  console.log(ctx,6666)
  // let {
  //   status,
  //   data: {
  //     province,
  //     city
  //   }
  // } = await axios.get(`http://wthrcdn.etouch.cn/weather_mini?city`)
  // console.log(status, province)
  // if (status === 200) {
  //   ctx.body = {
  //     province,
  //     city
  //   }
  // } else {
  //   ctx.body = {
  //     province: '',
  //     city: ''
  //   }
  // }
})

// 获取表单数据
router.get('/menu',async (ctx)=>{
  let {status,data:{menu}} = await axios.get('http://cp-tools.cn/geo/menu');
  if(status === 200 ){
    ctx.body = {
      menu
    }
  }else{
    ctx.body = {
      menu:[]
    }
  }
})
export default router