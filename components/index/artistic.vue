<template>
  <section class="m-istyle">
    <dl @mouseover="over">
      <dt>有格调</dt>
      <dd
        :class="{active:kind==='all'}"
        kind="all"
        keyword="景点"
      >
        全部
      </dd>
      <dd
        :class="{active:kind==='part'}"
        kind="part"
        keyword="美食"
      >
        约会聚餐
      </dd>
      <dd
        :class="{active:kind==='spa'}"
        kind="spa"
        keyword="丽人"
      >
        丽人SPA
      </dd>
      <dd
        :class="{active:kind==='movie'}"
        kind="movie"
        keyword="电影"
      >
        电影演出
      </dd>
      <dd
        :class="{active:kind==='travel'}"
        kind="travel"
        keyword="旅游"
      >
        品质出游
      </dd>
    </dl>
    <ul class="ibody">
      <li
        v-for="item in cur"
        :key="item.title"
      >
        <el-card
          :body-style="{ padding: '0px' }"
          shadow="never"
        >
          <img
            :src="item.img"
            class="image"
          >
          <ul class="cbody">
            <li 
              class="title"
            >
              {{ item.title }}
            </li>
            <li class="pos">
              <span 
                v-for="(posItem, posIndx) in item.pos"
                :key="posIndx"
              >{{ posItem }}</span>
            </li>
            <li class="info">
              {{ item.rating }}分 | {{ item.address }}
            </li>
            <li class="price">
              ￥<em> {{ item.price }} </em><span>/起</span>
            </li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  data: () => {
    return {
      kind: 'all',
      list: {
        all: [],
        part: [],
        spa: [],
        movie: [],
        travel: []
      }
    }
  },
  computed: {
    cur: function () {
      return this.list[this.kind]
    }
  },
  async mounted(){
    this.getArtistic('景点')
  },
  methods: {
    over: async function (e,keywords) {
      let dom = e.target
      let tag = dom.tagName.toLowerCase()
      if (tag === 'dd') {
        this.kind = dom.getAttribute('kind')
        let keyword = dom.getAttribute('keyword')
        this.getArtistic(keyword)
      }
    },

    // 获取列表信息
    async getArtistic(keyword){
      let self = this
      self.list[self.kind]=[]
      let {status,data:{count,pois}}=await self.$axios.get('/search/resultsByKeywords',{
        params:{
          keyword,
          city:self.$store.state.geo.position.city
        }
      })
      if(status===200&&count>0){
        // 过滤有图片的数据
        let r= pois.filter(item=>item.photos.length).map(item=>{
           return {
              title:item.name,
              pos:item.type.split(';'),
              price:item.biz_ext.cost.length?item.biz_ext.cost:'暂无',
              rating:item.biz_ext.rating,
              address:item.address,
              img:item.photos[0].url,
              url:'//abc.com'
            }
        })
        self.list[self.kind]=r.slice(0,12)
      }else{
        self.list[self.kind]=[]
      }
    }
  },

}
</script>
<style lang="scss">
    @import "@/assets/css/index/artistic.scss";
</style>
