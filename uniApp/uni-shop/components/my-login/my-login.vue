<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size='100' color='#AFAFAF'></uni-icons>
    <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
    <view class="login-text">
      登录后尽享更多权益
    </view>
  </view>
</template>

<script>
  import { mapMutations } from 'vuex'
  
  export default {
    name:"my-login",
    data() {
      return {
        
      };
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken']),

      getUserProfile() {
        uni.getUserProfile({
          desc:'你的授权信息',
          success: (res) => {
            console.log(res.userInfo)
            
            //将信息存到vuex中
            this.updateUserInfo(res.userInfo)
            
            // 获取登录成功后的 Token 字符串
            this.getToken(res)
          },
          fail: (res) => {
            return uni.$showMsg('您取消了登录授权！')
          }
        })
      },
      
      // 调用登录接口，换取永久的 token
      async getToken(info) {
        // 调用微信登录接口
        const [err, res] = await uni.login().catch(err => err)
        // 判断是否 uni.login() 调用失败
        if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
      
        // 准备参数对象
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        
        console.log(query)
      
        // 换取 token
        const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        
        // if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
        // uni.$showMsg('登录成功')
        // this.updateToken(loginResult.message.token)
        
        uni.$showMsg('假登录成功')
        this.updateToken("1234567890")
      },
    }
  }
</script>

<style lang="scss">
  .login-container{
    height: 750rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f8f8f8;
    
    position: relative;
    overflow: hidden;
    
    //绘制登录盒子底部的半椭圆造型
    &::after {
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
      height: 40px;
      left: 0;
      bottom: 0;
      background-color: white;
      border-radius: 100%;
      transform: translateY(50%);
    }

    .btn-login{
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #c00000;
    }
    .login-text{
      font-size: 12px;
      color: gray;
    }
  }

</style>