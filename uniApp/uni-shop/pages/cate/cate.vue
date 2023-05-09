<template>
  <view>
    <view class="scroll-view-container">
      <!-- 左侧滑动区域 -->
      <scroll-view class="left-scroll-view" scroll-y style="{height: wh +'px'}">
        <!-- <view class="left-scroll-view-item active">0000000</view> -->
        <block v-for="(item,index) in cateList" :key="index">
          <view :class="['left-scroll-view-item', index === active ? 'active' : '']" @click="activeChanged(index)">
            {{item.cat_name}}
          </view>
        </block>
        
      </scroll-view>
      <!-- 右侧滑动区域 -->
      <scroll-view class="right-scroll-view" scroll-y style="{height: wh +'px'}" :scroll-top="scrollTop">
        <view class="cate-leve2" v-for="(item,index) in cateLevel2List" :key="index">
          <view class="cate-leve2-title">
            / {{item.cat_name}} /
          </view>
          <view class="cate-leve3-list">
            <view class="cate-leve3-item" v-for="(item3,index3) in item.children" :key="index3" @click="jumpGoodsList(item3)">
              <image :src="item3.url"></image>
              <text>{{item3.cat_name}}</text>
            </view>
            
          </view>
        </view>
        
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        ww: 0,
        wh: 0,
        active: 0,
        cateList: [],
        cateLevel2List: [],
        scrollTop: 0,
      }
    },
    onLoad() {
      const sys = uni.getSystemInfoSync()
      this.ww = sys.windowWidth
      this.wh = sys.windowHeight
      this.getCateList()
    },
    methods: {
      async getCateList() {
          // 发起请求
          const { data: res } = await uni.$http.get('/api/public/v1/categories')
          if (res.meta.status !== 200) return uni.$showMsg()
          //三级分类
          res.message.forEach(item => {
            if (item.children) {
              item.children.forEach(item2 => {
               if (item2.children) {
                 item2.children.forEach(item3 => {
                   item3.url = item3.cat_icon.replace("https://api-ugo-dev.itheima.net","https://api-ugo-web.itheima.net")
                   // console.log(item3)
                 })
               }
              }) 
            }
          })
          
          //一级分类
          this.cateList = res.message
          //二级分类
          this.cateLevel2List = res.message[0].children
        },
        
        activeChanged(index) {
          this.active = index
          //二级分类
          this.cateLevel2List = this.cateList[index].children
          this.scrollTop = this.scrollTop === 0 ? 1 : 0
        },
        
        jumpGoodsList(item3) {
          uni.navigateTo({
            url:'/subpkg/goods_list/goods_list?cid=' + item3.cat_id
          })
        }
    }
    
  }
</script>

<style lang="scss">
.scroll-view-container{
  display: flex;
  
  .left-scroll-view{
    width: 120px;
    
    .left-scroll-view-item{
      line-height: 60px;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 12px;
      
      &.active {
        background-color: #ffffff;
        position: relative;
        
        &::before {
          content: ' ';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #C00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  
  .right-scroll-view{
    background-color: #ffffff;
    
    .cate-leve2-title{
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      padding: 15px 0;
    }
    .cate-leve3-list{
      display: flex;
      flex-wrap: wrap;
      
      .cate-leve3-item{
        width: 33.33%;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        
        image {
          width: 60px;
          height: 60px;
        }
        
        text {
          font-size: 12px;
        }
      }
    }
  }
  

}
</style>