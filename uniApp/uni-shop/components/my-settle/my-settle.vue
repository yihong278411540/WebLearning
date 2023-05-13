<template>
  <view class="my-settle-container">
    <!-- 全选 -->
    <label class="radio" @click="changeAllState">
      <radio color="#c00000" :checked="isFullCheck" /><text>全选</text>
    </label>
    
    <!-- 合计 -->
    <view class="amount-box">
      合计：<text class="amount">￥{{checkedGoodsAmount}}</text>
    </view>
    
    <!-- 结算按钮 -->
    <view class="settle-btn" @click="settlement">
      结算({{checkedCount}})
    </view>
    
  </view>
</template>

<script>
  import { mapGetters, mapMutations, mapState } from 'vuex' 
  
  export default {
    name:"my-settle",
    
    computed: {
      ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
      ...mapGetters('m_user', ['addstr']),
      ...mapState('m_user',['token']),
      
      isFullCheck() {
        return this.total === this.checkedCount
      }
    },
    data() {
      return {
        
      };
    },
    methods: {
      ...mapMutations('m_cart', ['updateAllGoodsState']),
      
      changeAllState(){
        console.log(this.isFullCheck)
        this.updateAllGoodsState(!this.isFullCheck)
      },
      
      settlement(){
        if (!this.isFullCheck) return uni.$showMsg('请选择要结算的商品！')
        // if (!this.addstr) return uni.$showMsg('请选择收货地址！')
        if (!this.token) return uni.$showMsg('请先登录！')
      }
    }
  }
</script>

<style lang="scss">
  .my-settle-container{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: gray;
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 5px;
    font-size: 14px;
    background-color: white;
    
    .radio{
      display: flex;
      align-items: center;
    }
    .amount-box{
     .amount{
       color: #c00000;
       font-weight: bold;
     } 
    }
    .settle-btn{
      background-color: #c00000;
      height: 50px;
      padding: 0 10px;
      line-height: 50px;
      text-align: center;
      color: white;
      
    }
    
  }
  
</style>