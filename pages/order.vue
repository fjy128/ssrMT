<template>
  <div class="page-order">
    <el-row>
      <!-- 左边栏 列表 -->
      <el-col 
        :span="4" 
        class="navbar"
       >
        <!-- <h3>我的美团</h3> -->
        <dl>
          <dt> 我的订单 </dt>
          <dd>
            全部订单
            <i class="el-icon-arrow-right" />
          </dd>
          <dd>
            代付款
            <i class="el-icon-arrow-right" />
          </dd>
          <dd>
            待使用
            <i class="el-icon-arrow-right" />
          </dd>
        </dl>
        <dl>
          <dt> 我的收藏 </dt>
          <dd>
            收藏的商家
            <i class="el-icon-arrow-right" />
          </dd>
          <dd>
            收藏的团购
            <i class="el-icon-arrow-right" />
          </dd>
        </dl>
        <dl>
          <dt> 抵用券 </dt>
          <dd>
            可用券
            <i class="el-icon-arrow-right" />
          </dd>
          <dd>
            失败券
            <i class="el-icon-arrow-right" />
          </dd>
        </dl>
        <dl>
          <dt>个人信息 </dt>
          <dd>
            账户设置
            <i class="el-icon-arrow-right" />
          </dd>
        </dl>
      </el-col>

      <!--右边栏 表格 -->
      <el-col
        :span="19"
        class="table"
      >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部订单" name="all"><list :cur="cur"/></el-tab-pane>
        <el-tab-pane label="代付款" name="unpay"><list :cur="cur"/></el-tab-pane>
        <el-tab-pane label="待使用" name="unuse"><list :cur="cur"/></el-tab-pane>
        <el-tab-pane label="待评价" name="unreplay"><list :cur="cur"/></el-tab-pane>
      </el-tabs>
      </el-col>
    </el-row>

  </div>
</template>

<script>
 import list from '../components/order/list'
  export default {
    components: {
      list
    },
    name: '',
    data() {
      return {
      activeName:'all',
      list:[],
      cur:[]
      }
    },
    watch:{
      activeName:function(val){
        console.log(this.list)
        this.url = this.list.filter(item=>{
          if(val === 'unpay'){
            return item.status === 0
          } else if(val === 'all'){
            return true
          }else{
            return false
          }
        })
      },
      list:function(){
        let val = this.activeName
        this.cur = this.list.filter(item=>{
          if(val === 'unpay'){
            return item.status === 0
          }else if(val === 'all'){
            return true
          }else{
            return false
          }
        })
      }
    },
    methods:{
      handleClick:function(tab){
        console.log(tab.name,555)
        this.activeName = tab.name
      }
    },
    
    // 服务端渲染的页面数据请求
    async asyncData(ctx){
      let {status,data:{code,list}} = await ctx.$axios.post('order/getOrders')
      if(status ===200 && code ===0 && list.length){
        return{
          // list:list.map(item=>{
          //   return{
          //     img:item.imgs.length?item.imgs[0].url:'/logo.png',
          //     name:item.name,
          //     count:1,
          //     total:item.total,
          //     status:item.status,
          //     statusTxt:item.status===0?'代付款':'已付款'
          //   }
          // }),
          cur:list.map(item=>{
            return{
              img:item.imgs.length?item.imgs[0].url:'/logo.png',
              name:item.name,
              count:1,
              total:item.total,
              status:item.status,
              statusTxt:item.status===0?'代付款':'已付款'
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/css/order/index.scss";
</style>