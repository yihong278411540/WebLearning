<template>
  <view class="my-search-container" :style="{'background-color': bgcolor}" @click="seachBoxHandler()">
    <view class="my-search-box" :style="{'border-radius': radius + 'px'}">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="my-search-placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    
    props: {
      bgcolor:{
        type: String,
        default: '#c00000'
      },
      radius:{
        type: Number,
        default: 18
      },
    },
    
    data() {
      return {
        
      };
    },
    methods: {
      seachBoxHandler() {
        console.log('-------')
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
  .my-search-container {
    //改用props控制
    // background-color: #c00000;
    height: 50px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    
    .my-search-box {
      background-color: #ffffff;
      height: 36px;
      width: 100%;
      //改用props控制
      // border-radius: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .my-search-placeholder{
        font-size: 14px;
        margin-left: 5px;
      }
    }
  }
  

</style>