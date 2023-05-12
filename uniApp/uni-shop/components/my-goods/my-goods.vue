<template>
  <view>
    <view class="goods-item">
      <!-- 左侧 -->
      <view class="goods-item-left">
        <radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClickHandler"></radio>
        <image :src="goods.goods_small_logo || defaultPic" class="goods-left-pic" mode=""></image>
      </view>
      <!-- 右侧 -->
      <view class="goods-item-right">
        <view class="goods-item-right-title">
          {{goods.goods_name}}
        </view>
        
        <view class="goods-info-box">
          <!-- 商品价格 -->
          <view class="goods-item-right-price">
            <!-- 通过管道符 | 调用过滤器 -->
            ￥{{goods.goods_price | tofixed}}
          </view>
          <!-- 商品数量 -->
          <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="changeNumHandler"></uni-number-box>
        </view>
        
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    props: {
      goods:{
        type: Object,
        default: {},
      },
      showRadio: {
        type: Boolean,
        default: false,
      },
      showNum: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
         defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
      };
    },
    filters: {
      //过滤器
      tofixed(num) {
        //把数字处理为带两位小数点的数字
        return Number(num).toFixed(2)
      }
    },
    methods: {
      radioClickHandler() {
        this.$emit('radio-change',{
          goods_id: this.goods.goods_id,
          goods_state: !this.goods.goods_state
        })
      },
      changeNumHandler(val) {
        console.log(val)
        this.$emit('num-change',{
          goods_id: this.goods.goods_id,
          goods_count: +val
        })
      }
    }
  }
</script>

<style lang="scss">
  
  .goods-item{
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #eeeeee;
    
    .goods-item-left{
      margin-right: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .goods-left-pic{
        width: 100px;
        height: 100px;
        // 防止图片下面有白色间隙
        display: block;
      }
      
      // radio
    }
    
    .goods-item-right{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      // align-items: ;
  
      .goods-item-right-title{
        font-size: 13px;
      }
      
        
      .goods-info-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        
        .goods-item-right-price{
          font-size: 14px;
          color: #c00000;
        }  
      }
      
    }
  }
  
</style>