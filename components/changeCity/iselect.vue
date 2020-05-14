<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select
      v-model="pvalue"
      placeholder="省份"
    >
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select
      v-model="cvalue"
      :disabled="!city.length"
      placeholder="城市"
      @change="changeSelect"
    >
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <span :style="{marginLeft:'25px'}">直接搜索:</span>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  data(){
    return {
      province:[],
      pvalue:'',
      city:[],
      cvalue:'',
      input:'',
      cities:[]
    }
  },
  watch:{
     // 监听省份
    pvalue:async function(newPvalue){
      let self=this;
      let {status,data:{city}}=await self.$axios.get(`/geo/province/${newPvalue}`)
      if(status===200){
        self.city=city.map(item=>{
          return {
            value:item.id,
            label:item.name
          }
        })
        self.cvalue=''
      }
    }
  },
  mounted:async function(){
    let self=this;
    let {status,data:{province}}=await self.$axios.get('/geo/province')
    if(status===200){
      self.province=province.map(item=>{
        return {
          value:item.id,
          label:item.name
        }
      })
    }
  },
  methods:{
    // _.debounce延迟搜索
    querySearchAsync:_.debounce(async function(query,cb){
      let self=this;
      if(self.cities.length){
        cb(self.cities.filter(item => item.value.indexOf(query)>-1))
      }else{
        let {status,data:{city}}=await self.$axios.get('/geo/city')
        if(status===200){
          self.cities=city.map(item=>{return {
            value:item.name
          }})
          cb(self.cities.filter(item => item.value.indexOf(query)>-1))
        }else{
          cb([])
        }
      }
    },200),
    //下拉框选择城市
    changeSelect:function(paramVal){
      let obj = {}
      obj = this.city.find(item=>{
        return item.value === paramVal
      })
      let newObj ={label:obj.value,value:obj.label}
       // 调用搜索选择城市函数
       this.handleSelect(newObj)
    },
    // 搜索选择城市
    handleSelect:function(item){
       // 通过全家桶管理城市状态,当页面做跳转时，当前切换城市状态不会被改变
      this.$store.commit('geo/setPosition',{ city:item.value, province:'' })
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/iselect.scss";
</style>
