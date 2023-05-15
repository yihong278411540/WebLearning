<template>
  <view>
    <my-userinfo  @click="clickUserInfo"></my-userinfo>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    },
    methods: {
      clickUserInfo() {
        console.log('clickUserInfo')
        uni.navigateTo({
          url:'/subpkg/login/login'
        })
      }
    }
  }
</script>

<style lang="scss">

</style>
