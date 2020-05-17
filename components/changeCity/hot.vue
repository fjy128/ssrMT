<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市：</dt>
      <dd
        v-for="item in list"
        :key="item.id"
        @click="changeCity(item)"
      >
        {{ item.name==='市辖区'?item.province:item.name }}
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list:[]
    }
  },
  async mounted(){
    let {status,data:{hots}}= await this.$axios.get('/geo/hotCity')
    if(status===200){
      this.list=hots
    }
  },
  methods:{
   async changeCity(item){
      let city = item.name==='市辖区'?item.province:item.name
      // 通过全家桶管理城市状态,当页面做跳转时，当前切换城市状态不会被改变
      this.$store.commit('geo/setPosition',{ city, province:item.province })
        // 热门搜索随着城市变换数据做相应的改变
      const {status:searchStatus,data:{result}}  = await this.$axios.get('/search/hotPlace',{
        params:{ city:city.replace('市','') }
      })
     this.$store.commit('home/setHotPlace', searchStatus === 200 ? result:[])
     this.$router.push('/')
      
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/hot.scss";
</style>
