<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col
        :span="3"
        class="left"
      >
        <img
          src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
          alt="美团"
          @click="gotoIndex"
        >
      </el-col>
      <el-col
        :span="15"
        class="center" 
      >
        <div class="wrapper">
          <el-input
            v-model="search"
            placeholder="搜索商家或地点"
            @focus="focus"
            @blur="blur"
            @input="input"
          />
          <button class="el-button el-button--primary">
            <i class="el-icon-search" />
          </button>
          <!-- 用户获取输入框未输入时推荐 -->
          <dl
            v-show="isHotPlace"
            class="hotPlace"
          >
            <dt>热门搜索</dt>
            <dd 
              v-for="(item,idx) in $store.state.home.hotPlace.slice(0,5)" 
              :key="idx"
            >
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{ item.name }}</a>
            </dd>
          </dl>
          <!-- 用户在搜索框输入数据时推荐 -->
          <dl
            v-show="isSearchList"
            class="searchList"
          >
            <dd
              v-for="(item,idx) in searchList"
              :key="idx"
            >
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{ item.name }}</a>
            </dd>
          </dl>
        </div>
        <!-- 搜索框底部默认推荐 -->
        <p class="suggest">
          <a
            v-for="(item,idx) in $store.state.home.hotPlace.slice(0,5)"
            :key="idx"
            :href="'/products?keyword='+encodeURIComponent(item.name)"
          >
            {{ item.name }}
          </a>
        </p>
        <!-- 导航栏 -->
        <ul class="nav">
          <li 
            v-for="(item,idx) in navData"
            :key="idx"
          >
            <nuxt-link
              :to="item.linkTo"
              :class="item.className"
            > 
              {{ item.name }}
            </nuxt-link>
          </li>
        </ul>
        <!--  -->
      </el-col>
      <el-col
        :span="6"
        class="right" 
      >
        <ul class="security">
          <li>
            <i class="refund" />
            <p class="txt">
              随时退
            </p>
          </li>
          <li>
            <i class="single" />
            <p class="txt">
              不满意免单
            </p>
          </li>
          <li>
            <i class="overdue" />
            <p class="txt">
              过期退
            </p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _ from 'lodash'// 引入lodash
export default {
  data(){
    return {
      navData:[{name:'美团外卖',className:'takeout',linkTo:'/'},{name:'猫眼电影',className:'movie',linkTo:'/'},
      {name:'美团酒店',className:'hotel',linkTo:'/'},{name:'名宿/公寓',className:'apartment',linkTo:'/'},
      {name:'商家入驻',className:'business',linkTo:'/'}],
      search:'',
      isFocus:false,
      hotPlace:[],
      searchList:[]
    }
  },
  computed:{
    isHotPlace:function(){
      return this.isFocus&&!this.search
    },
    isSearchList:function(){
      return this.isFocus&&this.search
    }
  },
  mounted(){
    console.log(this.$store.state.home.hotPlace,'hotplace')
  },
  methods:{
    // fnSearchWord(item){
    //   this.$router.push(`/products?keyword=${encodeURIComponent(item.name)}`)
    //   console.log(item)
    // },
    gotoIndex:function(){
      let {path} = this.$router.history.current
      if (path == '/' ){ return false;} // 阻止当前页面在首页点击访问首页报错问题
      this.$router.push({
        path:'/'
      })
    },
    focus:function(){
      this.isFocus=true
    },
    blur:function(){
      let self=this;
      setTimeout(function(){
        self.isFocus=false
      },200)
    },
    // 这里不能输一个字母就请求，需要延时， 可以使用第三方库 lodash,需要项目中安装
    input:_.debounce(async function(){
      let self=this;
      let city=self.$store.state.geo.position.city.replace('市','') // 获取当前城市
      self.searchList=[]
      let {status,data:{top}}= await self.$axios.get('/search/top',{
        params:{
          input:self.search,
          city
        }
      })
      // self.searchList=top.slice(0,10) // 截取10 调数据
      self.searchList=top
    },300)
  }
}
</script>

<style lang="css">
</style>
