import Router from 'koa-router';
import axios from './utils/axios'

let router = new Router({prefix:'/geo'})

const sign = 'fjy'//签名

// 获取当前城市
router.get('/getPosition', async (ctx) => {
  console.log(ctx,8888)
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

export default router