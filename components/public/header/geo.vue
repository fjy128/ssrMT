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
    [香河 廊坊 天津]
  </div>
</template>

<script>
export default {
  data(){
    return{
      currCity:''
    }
  },
  async mounted() {
   let {status,data: {province,city}} = await this.$axios.get(`geo/getPosition`)
  console.log(status, province,city)
  if(status !== 200) return false;
  this.currCity = `${province}${city}`
  },
}
</script>

<style lang="css">
</style>