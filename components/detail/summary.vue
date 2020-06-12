<template>
  <div>
    <dl class="m-sum-card">
      <dt>
        <h1>{{ meta.name }}</h1>
        <el-rate
          v-model="rate"
          disabled 
        />
        <span>{{ Number(meta.biz_ext.rating)||rate }}分</span>
        <span>人均￥{{ Number(meta.biz_ext.cost) }}</span>
        <ul>
          <li> 
            地址：{{ meta.address }} 
            <i
              :style="{cursor:'pointer',color:'#00c9b3'}"
              class="el-icon-location-information"
              @click="openMap(meta.location)"
            />
          </li>
          <li v-show="meta.tel.length">
            电话：{{ meta.tel }}
          </li>
          <li v-show="meta.timestamp">
            营业时间：{{ meta.timestamp }}
          </li>
        </ul>
      </dt>
      <dd>
        <el-carousel
          height="214px"
          indicator-position="none"
        >
          <el-carousel-item
            v-for="(item,idx) in meta.photos"
            :key="idx"
          >
            <h3>
              <img
                :src="item.url"
                alt="item.title"
                width="100%"
                height="100%"
              >
            </h3>
          </el-carousel-item>
        </el-carousel>
      </dd>
    </dl>
    <!-- 遮罩层 -->
    <el-dialog
      :visible.sync="dialogTableVisible"
    >
      <div
        :id="id"
        :style="{width:width+'px',height:height+'px',margin:'0px auto'}"
        class="m-map"
      />
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    meta: {
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  data() {
    return {
      dialogTableVisible:false,
      id:'',
      width:600,
      height:400,
      key:'1f36f970e1068b5a9ccfb8dfb8fd6027',//你高德地图创建的key
      map:null,
      sale: 70 + Math.floor(Math.random() * 300),
    }
  },
  computed: {
    rate: function () {
      return Number(this.meta.biz_ext.rating) || Math.floor(Math.random() * 5)
    }
  },
  methods: {
    openMap(location){
      this.dialogTableVisible = true;//显示遮罩层
      let [longitude,latitude] = location.split(',');
      let newLocation = [Number(longitude),Number(latitude)]
      this.id = `map${Math.random().toString().slice(3,6)}`;
        window.mapOnLodal  = ()=>{
          // 实例画地图
        var map = new AMap.Map(this.id,{
          zoom:11,//级别
          center: newLocation,//中心点坐标，经度、纬度，
          resizeEnable:true,//是否监控地图容器尺寸变化
        });
        // 地图标志
        var marker = new AMap.Marker({
              position: new AMap.LngLat(longitude,latitude),
              icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png', // 添加 Icon 图标 URL
              title: this.meta.name
          });
          map.add(marker);
        // 地图控件
        AMap.plugin(['AMap.ToolBar','AMap.OverView'],function(){
          map.addControl(new AMap.ToolBar());//工具条，控制地图的缩放、平移等
          map.addControl(new AMap.OverView({isOpen:true}));//鹰眼，显示缩略图
        })
        // 信息窗体的内容
        let content = [`<div><b>${this.meta.name}</b><p>地址：${this.meta.address}</p><p>营业时间：${this.meta.timestamp}</p><p>电话：${this.meta.tel}</p></div>`]
        // 创建窗体实例
        var infoWindow = new AMap.InfoWindow({
          // offset: new AMap.Pixel(16, -50),
          // anchor: 'bottom-left',
          // autoMove:true,
          // placeSearch:true,
          content: content.join("<br>")//传入 dom 对象，或者 html 字符串
        });
        // 打开信息窗体
        infoWindow.open(map,[longitude,latitude])
      }
      var url = `https://webapi.amap.com/maps?v=1.4.15&key=${this.key}&callback=mapOnLodal`;
      let jsapi = document.createElement('script');
      jsapi.charset = 'utf-8';
      jsapi.src = url;
      document.head.appendChild(jsapi); 
    }
 }
}
</script>
<style>
.el-dialog__body{
  padding:13px 22px
}
</style>
