<template>
  <view class="goods-detail-container" v-if="goods_info.goods_name">
    <!-- 商品轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,index) in goods_info.pics" :key="index">
        <!-- <view class="swiper-item"></view> -->
        <image :src="item.pics_big" @click="preview(index)"></image>
      </swiper-item>
    </swiper>
    
    <!-- 商品详情 -->
    <view class="goods-info-box">
      <!-- 价格 -->
      <view class="goods-price">
        ￥{{goods_info.goods_price | tofixed}}
      </view>
      <!-- 信息 -->
      <view class="goods-info-body">
        <view class="goods-name">
          {{goods_info.goods_name}}
        </view>
        <view class="goods-favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="goods-yf">
        快递：免运费
      </view>
    </view>
    
    <!-- 商品详情信息 -->
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    
    <view class="goods_nav">
      <!-- fill 控制右侧按钮的样式 -->
      <!-- options 左侧按钮的配置项 -->
      <!-- buttonGroup 右侧按钮的配置项 -->
      <!-- click 左侧按钮的点击事件处理函数 -->
      <!-- buttonClick 右侧按钮的点击事件处理函数 -->
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
    </view>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        goods_info: {},
        // 左侧按钮组的配置对象
        options: [{
          icon: 'shop',
          text: '店铺'
        }, {
          icon: 'cart',
          text: '购物车',
          info: 2
        }],
        // 右侧按钮组的配置对象
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      }
    },
    methods: {
      //定义请求商品详情数据的方法
      async getGoodsDetail(goods_id) {
        const {data: res} = await uni.$http.get('/api/public/v1/goods/detail', {goods_id})
        if(res.meta.status !== 200) return uni.$showMsg()
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;"').replace(/webp/g, 'jpg')
        this.goods_info = res.message
      },
      preview(index) {
        uni.previewImage({
          current: index,
          urls: this.goods_info.pics.map(x => x.pics_big)
        })
      },
      
      onClick(e) {
        console.log(e.content.text)
        if (e.content.text === '购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
        
      buttonClick(e) {
      }
    },
    onLoad(options) {
      console.log(options)
      const goods_id = options.goods_id
      this.getGoodsDetail(goods_id)
    },
    filters: {
      //过滤器
      tofixed(num) {
        //把数字处理为带两位小数点的数字
        return Number(num).toFixed(2)
      }
    },
  }
</script>

<style lang="scss">
  
  swiper {
    height: 750rpx;
    
    image {
      width: 100%;
      height: 100%;
    }
  }
  
  .goods-info-box {
    margin: 10px;
    
    .goods-price {
      font-size: 18px;
      color: #c00000;
      margin: 10px 0;
    }
    
    .goods-info-body {
      display: flex;
      justify-content: space-between;
      
      .goods-name {
        font-size: 14px;
        padding-right: 10px;
      }
        
      .goods-favi {
        width: 120px;
        font-size: 12px;
        display: flex;
        flex-direction: column;;
        justify-content: center;
        align-items: center;
        border-left: 1px solid #eeeeee;
        color: gray;
      }
    }
    
    .goods-yf {
      margin: 10px 0;
      font-size: 12px;
      color: gray;
    }
  }
  
  .goods-detail-container {
    // 给页面外层的容器，添加 50px 的内padding，
    // 防止页面内容被底部的商品导航组件遮盖
    padding-bottom: 50px;
  }
  .goods_nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  
</style>
