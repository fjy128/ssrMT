<template>
  <el-row 
    :gutter="0" 
    class="m-header"
  >
    <el-col :span="6">
      <geo />
    </el-col>
    <el-col :span="8">
      <user />
    </el-col>
    <el-col :span="8">
      <navbar />
    </el-col>
  </el-row>
</template>

<script>
import Geo from './geo.vue';
import User from './user.vue'
import Navbar from './nav.vue'
  export default {
    name: '',
    components:{
      Geo,
      User,
      Navbar
    },
    data() {
      return {
        
      }
    }
  }
</script>


<style lang="scss">
  @import "@/assets/css/public/layout.scss";
  @import "@/assets/css/public/header/index.scss";
</style>