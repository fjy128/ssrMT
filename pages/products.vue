<template>
  <el-row>
    <el-col :span="19">
      <crumbs />
    </el-col>
  </el-row>
</template>

<script>
import Crumbs from '@/components/products/crumbs.vue'
  export default {
    components:{
      Crumbs
    },
    data() {
      return {
        
      }
    }
  }
</script>

<style lang="" scoped>
  
</style>