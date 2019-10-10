import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules:{
    geo,
    home
  },
  /**
   * 解析 ： 
   * 1、在这里只能拿到vue的实例 app 拿不到this，所有只能使用 app.$axios.get 进行调用
   * 2、使用commit 来进行vuex数据的提交
   * 3、因为使用const声明变量，所以status命名必须保持不变
   * @description geo/setPosition 获取当前所在城市
   * @description home/setMenu 获取左边栏菜单
   * @description home/setHotPlace 获取左边栏菜单
   * **/
  actions:{
    async nuxtServerInit({commit},{req,app}){
    const {status, data: { province, city }} = await app.$axios.get('/geo/getPosition') 
    commit('geo/setPosition', status === 200 ? { city, province } : { city: '',  province: ''})

     const {status:homeStatus,data:{menu}}  = await app.$axios.get('/geo/menu')
     commit('home/setMenu', homeStatus === 200 ? menu:[])

     const {status:searchStatus,data:{result}}  = await app.$axios.get('/search/hotPlace',{
      params:{
        city:app.store.state.geo.position.city.replace('市','')
      }
     })
     commit('home/setHotPlace', searchStatus === 200 ? result:[])
    }
  }
})

export default store