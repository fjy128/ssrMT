<template>
  <div class="">
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd
        v-for="item in list"
        :key="item"
      >
        <a :href="'#city-'+item">{{ item }}</a>
      </dd>
    </dl>
    <dl
      v-for="item in block"
      :key="item.title"
      class="m-categroy-section"
    >
      <dt :id="'city-'+item.title">
        {{ item.title }}
      </dt>
      <dd>
        <span
          v-for="c in item.city"
          :key="c"
          @click="changeCity(c)"
        >
          {{ c }}
        </span>
      </dd>
    </dl>
  </div>
</template>

<script>
import pyjs from 'js-pinyin'
export default {
  data(){
    return {
      list:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      block:[]
    }
  },
  async mounted(){
    let self=this;
    let blocks=[]
    let {status,data:{city}}=await self.$axios.get('/geo/city');
    if(status===200){
      let p
      let c
      let d={}
      city.forEach(item=>{
        p=pyjs.getFullChars(item.name).toLocaleLowerCase().slice(0,1) // 获取拼音首字母
        c=p.charCodeAt(0)  // 去小写的a-z(97-122)
        if(c>96&&c<123){
          if(!d[p]){
            d[p]=[]
          }
          d[p].push(item.name)
        }
      })
      for(let [k,v] of Object.entries(d)){
        blocks.push({
          title:k.toUpperCase(),
          city:v
        })
      }
      blocks.sort((a,b)=>a.title.charCodeAt(0)-b.title.charCodeAt(0)) // 排序
      self.block=blocks
    }
  },
  methods:{
    changeCity(val){
      // 通过全家桶管理城市状态,当页面做跳转时，当前切换城市状态不会被改变
      this.$store.commit('geo/setPosition',{ city:val, province:'' })
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/categroy.scss";
</style>
