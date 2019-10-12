<template>
  <div class="m-crumbs">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item 
        :to="{ path: '/' }"
      >
        深圳美团
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">青芒果旅行网</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    keyword: {
      type: String,
      default: ''
    }
  }
}
</script>
