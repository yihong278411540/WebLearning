<template>
  <view>
    <!-- 搜索组件 -->
    <view class="search-box">
      <my-search @click="gotoSearch"></my-search>
    </view>
    
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
      <view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
    
    <view class="floor-list">
      <view class="floor-item" v-for="(item,index) in floorList" :key="index">
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <view class="floor-image-box">
          <!-- 左侧 -->
          <navigator class="left-image-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
          </navigator>
          <!-- 右侧 -->
          <view class="right-image-box">
            <navigator class="right-image-item" v-for="(item2,index2) in item.product_list" :key="index2" v-if="index2 !== 0" :url="item2.url">
              <image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix"></image>
            </navigator>
          </view>
        </view>
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
        floorList: [],
      }
    },
    
    onLoad() {
      //2.在小程序页面刚加载的时候，调用获取轮播图数据的方法
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
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
      
      //导航分类列表
      async getNavList() {
        const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.navList = res.message
        
        console.log(res)
        uni.$showMsg('navList数据加载成功')
      },
      
      //获取楼层列表数据
      async getFloorList() {
        const { data: res } = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status !== 200) return uni.$showMsg()
        
        res.message.forEach(item => {
          item.product_list.forEach(product => {
            product.url = "/subpkg/goods_list/goods_list?" + product.navigator_url.split('?')[1]
          })
        })
        
        this.floorList = res.message
      },
      
      // 导航点击事件
      navClickHandler(item) {
        if (item.name === '分类') {
          uni.switchTab({
            url:"/pages/cate/cate"
          })
        }
      },
      
      gotoSearch() {
        console.log('ok')
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
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
  
  .floor-title {
    width: 100%;
    height: 60rpx;
  }
  .right-image-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .floor-image-box {
    display: flex;
    padding-left: 10rpx;
  }
  
  .search-box {
    //吸顶效果
    position: sticky;
    //吸顶位置
    top: 0;
    //提高层级，防止被轮播图覆盖
    z-index: 999;
  }
  
  
</style>