<template>
  <view class="cart-container" v-if="cart.length != 0">
    <!-- 收货地址 -->
    <my-address></my-address>
    
    <!-- 购物车标题 -->
    <view class="cart-title">
      <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-title-text">购物车</text>
    </view>
    

    <!-- uni-swipe-action 是最外层包裹性质的容器 -->
    <uni-swipe-action>
      <block v-for="(goods, index) in cart" :key="index">
        <!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。需要通过 options 属性来指定操作按钮的配置信息 -->
        <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
          <my-goods :goods="goods" :show-radio="true" show-num="true" @radio-change="radioChangeHandler" @num-change="numChangeHandler"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    
    <my-settle></my-settle>
    
  </view>
  
  <!-- 空白占位 -->
  <view class="empty-cart" v-else>
    <text>空空如也~</text>
  </view>
  
</template>

<script>
  import badgeMix from "@/mixins/tabbar-badge.js"
  import { mapState, mapMutations } from 'vuex'
  
  export default {
    
    mixins: [badgeMix],
    
    computed: {
      ...mapState('m_cart', ['cart']),
    },
    
    data() {
      return {
        options: [{
              text: '删除', // 显示的文本内容
              style: {
                backgroundColor: '#C00000' // 按钮的背景颜色
              }
            }]
      };
    },
    methods: {
      
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsNum', 'removeGoods']),
      
      //商品的勾选状态发生变化
      radioChangeHandler(e) {
        console.log(e)
        this.updateGoodsState(e)
      },
      numChangeHandler(e) {
        console.log(e)
        this.updateGoodsNum(e)
      },
      // 点击了滑动操作按钮
      swipeActionClickHandler(goods) {
        console.log(goods)
        this.removeGoods(goods)
      }
    },
    
  }
</script>

<style>
  .cart-container{
    padding-bottom: 50px;
  }
  .cart-title {
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 10px;
    border-bottom: 1px solid #eeeeee;
  } 
  .cart-title-text {
   margin-left: 5px;
   font-size: 14px;
  }
  
  .empty-cart{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
    
    /* text{
      font-size: 12px;
      color: gray;
    } */
  }
  
  
</style>