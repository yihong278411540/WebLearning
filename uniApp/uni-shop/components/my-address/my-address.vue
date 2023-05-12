<template>
  <view>
    <!-- 选择地址按钮 -->
    <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" class="address-choose-btn" @click="chooseAddress">请选择收获地址+</button>
    </view>
    <!-- 地址信息 -->
    <view class="address-info-box" v-else>
      <view class="row1">
        <view class="row1-left">
          收货人：<text>{{address.userName}}</text>
        </view>
        <view class="row1-right">
          <view class="row1-right-phone">
            电话：<text>{{address.telNumber}}</text>
          </view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">
          收货地址：
        </view>
        <view class="row2-right">
          {{addStr}}
        </view>
      </view>
    </view>
    
    <image src="/static/cart_border@2x.png" class="address-border"></image>
  </view>
</template>

<script>
  export default {
    name:"my-address",
    
    computed: {
      addStr() {
        if (!this.address.provinceName) return ''
        return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo
      }
    },
    data() {
      return {
        address: {}
      };
    },
    methods: {
      async chooseAddress(){
        // 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
        //    返回值是一个数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象
        const [err, succ] = await uni.chooseAddress().catch(err => err)
        
        // 2. 用户成功的选择了收货地址
        if (err === null && succ.errMsg === 'chooseAddress:ok') {
          // 为 data 里面的收货地址对象赋值
        this.address = succ
        
        console.log(succ)
      }
        
      }
    }
  }
</script>

<style lang="scss">
  
    
  .address-border{
    display: block;
    width: 100%;
    height: 5px;
  }
  
  .address-choose-box{
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .address-info-box{
    font-size: 12px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 5px;
    
    .row1{
      display: flex;
      justify-content: space-between;
      
      .row1-left{
      }
      .row1-right{
        display: flex;
        align-items: center;
        
        .row1-right-phone{
          padding-right: 5px;
        }
      }
    }
    .row2{
      display: flex;
      align-items: center;
      margin-top: 10px;
      .row2-left{
        white-space: nowrap;
      }
      .row2-right{
      }
    }
  }
  

</style>