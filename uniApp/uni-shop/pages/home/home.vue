<template>
  <swiper :indicator-dots="true" :autoplay="true" :interval="6000" :duration="2000" circular="true">
    <swiper-item v-for="(item, i) in swiperList" :key="i">
      <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goos_id=' + item.goods_id">
        <image :src="item.image_src"></image>
      </navigator>
    </swiper-item>
  </swiper>
</template>

<script>
  export default{
    data() {
      return{
        //1. 轮播图的数据列表，默认为空数组
        swiperList: [],
      }
    },
    
    onLoad() {
      //2.在小程序页面刚加载的时候，调用获取轮播图数据的方法
      this.getSwiperList()
    },
    methods: {
      //3.请求轮播图列表
      async getSwiperList() {
        const {data : res} = await uni.$http.get('/api/public/v1/home/swiperdata')
        if (res.meta.status !== 200) return uni.$showMsg()
        
        console.log(res)
        //请求成功，为data重的数据赋值
        this.swiperList = res.message
        
        // return uni.$showMsg(title: '数据请求成功')
      },
      
    },
    
  }
</script>

<style lang="scss">
  swiper {
    height: 330rpx;
    
    .swiper-item, image {
      width: 100%;
      height: 100%;
    }
  }
</style>