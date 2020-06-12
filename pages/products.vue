<template>
  <el-row class="page-product">
    <el-col :span="19">
      <crumbs :keyword="keyword" />
      <categroy
        :types="types"
        :areas="areas" 
      />
      <list :list="list" />
    </el-col>
    <el-col :span="5">
      <amap
        v-if="point.length"
        :width="230"
        :height="290"
        :point="point"
      />
    </el-col>
  </el-row>
</template>

<script>
import Crumbs from '@/components/products/crumbs.vue'
import Categroy from '@/components/products/categroy.vue'
import List from '@/components/products/list.vue'
import Amap from '@/components/public/map.vue'
export default {
  // watchQuery成功解决asyncData服务端渲染不会根据路由变化改变数据，keyword是路由变换的关键字
  watchQuery:['keyword'],
  components:{
    Crumbs,
    Categroy,
    List,
    Amap
  },
  data(){
    return {
      list:[],
      types:[],
      areas:[],
      keyword:'',
      point:[]
    }
  },
  
  // 服务端渲染的页面数据请求
  async asyncData(ctx){
    let keyword = ctx.query.keyword//搜索关键字
    let city = ctx.store.state.geo.position.city//所在城市
    // 获取列表数据
    let {status,data:{count,pois}} = await ctx.$axios.get('/search/resultsByKeywords',{
      params:{
        keyword,
        city
      }
    })
    let {status:status2,data:{areas,types}} = await ctx.$axios.get('/categroy/crumbs',{
      params:{
        city
      }
    })
    if(status===200&&count>0&&status2===200){
      return {
        list: pois.filter(item=>item.photos.length).map(item=>{
          return {
            type: item.type,
            img: item.photos[0].url,
            name: item.name,
            comment: Math.floor(Math.random()*10000),
            rate: Number(item.biz_ext.rating),
            price: Number(item.biz_ext.cost),
            scene: item.tag,
            tel: item.tel,
            status: '可订明日',
            location: item.location,
            module: item.type.split(';')[0]
          }
        }),
        keyword,
        areas: areas.filter(item=>item.type!=='').slice(0,5),
        types: types.filter(item=>item.type!=='').slice(0,5),
        point: (pois.find(item=>item.location).location||'').split(',')
      }
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/products/index.scss";
</style>
