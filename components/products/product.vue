<template>
  <dl class="s-item">
    <dt>
      <img
        :src="meta.img"
        alt="商品图片"
      >
    </dt>
    <dd>
      <h3>
        <nuxt-link :to="{path:'detail',query:{keyword:meta.name,type:meta.module}}">
          {{ meta.name }}
        </nuxt-link>
      </h3>
      <p
        v-if="meta.rate>0"
      >
        <el-rate
          v-model="meta.rate"
          :colors="['#ff9900', '#ff9900', '#FF9900']"
          disabled
        />
    
        <span
          v-if="meta.rate>4"
          class="s-item-comment"
        > 很好</span>
        <span
          v-else-if="meta.rate>3"
          class="s-item-comment"
        >一般</span>
        <span
          v-else
          class="s-item-comment"
        >很差</span>
        <span class="s-item-value">{{ meta.rate }}分</span>
      </p>
      <p
        v-else
        :style="{display:'inline-block',color:'#999'}"
      >
        <span>暂无评分</span>
      </p>
      <span class="s-item-comment-total">{{ meta.comment }}人评论</span>
      <p>
        <!-- <span class="s-item-type">{{ meta.type }}</span> -->
        <span
          v-for="(itemType,idxType) in meta.type"
          :key="idxType"
          class="span_type"
        >{{ itemType }}</span>
        <span class="s-item-addr">{{ meta.addr }}</span>
      </p>
      <p>
        <em
          v-if="meta.price>0"
          class="s-item-price"
        >￥{{ meta.price }}起</em>
        <em
          v-else
          class="no-item-price"
        >暂无价格</em>
        <b>{{ meta.status }}</b>
      </p>
      <ul>
        <!-- <li>
          <span class="detail-type">门票</span>{{meta.ticket}}
        </li>
        <li>
          <span class="detail-type">跟团</span>{{meta.group}}
        </li> -->
        <li v-if="meta.scene&&meta.scene.length">
          <span class="detail-type">景酒</span>
          <span
            v-for="tag in meta.scene "
            :key="tag"
            class="detail-label"
          >{{ tag }}</span>
         
          <span
            class="detail-showmore"
            @click="showMore"
          >收起</span>
        </li>
        <li v-else>
          <span class="detail-type">景酒</span>暂无描述
        </li>
      </ul>
    </dd>
  </dl>
</template>

<script>
export default {
  props: {
    meta: {
      type:Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return{
      ismore:false
    }
  },
  methods:{
    showMore(){
      this.ismore=true
    }
  }
}
</script>
