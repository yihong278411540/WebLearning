<template>
  <view>
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="6000" :duration="2000" circular="true">
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goos_id=' + item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item,index) in navList" :key="index">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
    
    
  </view>
</template>

<script>
  export default{
    data() {
      return{
        //1. 轮播图的数据列表，默认为空数组
        swiperList: [],
        navList: [],
      }
    },
    
    onLoad() {
      //2.在小程序页面刚加载的时候，调用获取轮播图数据的方法
      this.getSwiperList()
      this.getNavList()
    },
    methods: {
      //3.请求轮播图列表
      async getSwiperList() {
        const {data : res} = await uni.$http.get('/api/public/v1/home/swiperdata')
        if (res.meta.status !== 200) return uni.$showMsg()        
        //请求成功，为data重的数据赋值
        this.swiperList = res.message
        
        console.log(res)
        uni.$showMsg('swiperList数据加载成功')
      },
      
      async getNavList() {
        const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.navList = res.message
        
        console.log(res)
        uni.$showMsg('navList数据加载成功')
      }
      
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
  
  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;
    
    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }
  
</style>