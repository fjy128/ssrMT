<template>
  <div class="m-geo">
    <i class="el-icon-location" />
    {{ $store.state.geo.position.city }}
    <nuxt-link
      class="changeCity"
      to="/changeCity"
    >
      切换城市
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data(){
    return{
      currCity:''
    }
  },
  // 以下代码项目没有使用，目的在于知道如何调用数据
  async mounted() {// mounted是在浏览器端渲染，asyncDate是在服务端完成渲染
   let {status,data: {province,city}} = await this.$axios.get(`geo/getPosition`)
  console.log(status, province,city,'geo')
  if(status !== 200) return false;
  this.currCity = `${province}${city}`
  },
}
</script>
