<template>
  <view>   
  <!-- 搜索栏 -->
   <view class="search-box">
     <uni-search-bar :radius="100" cancelButton="none" @input="input">
     </uni-search-bar>
   </view>
   
   <!-- 搜索建议列表 -->
   <view class="sugg-list" v-if="searchList.length != 0">
     <view class="sugg-item" v-for="(item,index) in searchList" :key="index" @click="gotoGoodDetail(item)">
       <view class="item-goodsname">{{item.goods_name}}</view>
       <uni-icons type="arrowright" size="16"></uni-icons>
     </view>
   </view>
   
   <!-- 搜索历史 -->
   <view class="history-box" v-else>
     <!-- 搜索头部 -->
     <view class="history-title">
       <text>搜索历史</text>
       <uni-icons type="trash" size="17" @click="cleanHistory()"></uni-icons>
     </view>
     <!-- 搜索列表 -->
     <view class="history-list">
       <uni-tag class="uni-tag" :text="item" v-for="(item,index) in histories" :key="index" @click="gotoGoodList(item)"></uni-tag>
     </view>
   </view>
    
  </view>
</template>

<script>
  export default {
    computed: {
      histories() {
        return [...this.historyList].reverse()
      }
    },
    data() {
      return {
        //延时器
        timer: null,
        //搜索结果
        kw: '',
        //搜索列表
        searchList:[],
        //搜索历史
        historyList:['a', 'app', 'apple'],
      };
    },
    methods: {
      input(e) {
        // console.log(e)
        
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.kw = e
          this.getSearchList()
          console.log(this.kw)
        }, 500)
      },
      
      //根据搜索关键词，搜索商品列表
      async getSearchList() {
        if (this.kw === '') {
          this.searchList = []
          return
        }
        //数据请求
        const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch', {query: this.kw})
        if (res.meta.status !== 200) return uni.$showmsg()
        this.searchList = res.message
        
        this.saveSearchHistory()
      },
      
      //跳转商品详情
      gotoGoodDetail(item) {
        console.log(item.goods_id)
        uni.navigateTo({
          url:"/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id
        })
      },
      
      //保存关键词
      saveSearchHistory() {
        // this.historyList.push(this.kw)
        
        //关键词去重
        const set = new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
        this.historyList = Array.from(set)
        
        //保存搜搜历史到本地
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      
      //清理关键词
      cleanHistory() {
        this.historyList = []
        //清理本地数据
        uni.setStorageSync('kw', '[]')
      },
      
      //跳转商品列表
      gotoGoodList(item) {
        uni.navigateTo({
          url:"/subpkg/goods_list/goods_list?query=" + item
        })
      },
      
    },
    onLoad() {
      // 获取本地存储的搜索历史
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    }
  }
</script>

<style lang="scss">
  
  .search-box{
    background-color: #c00000;
    position: sticky;
    top: 0;
    z-index: 999;
  }
  .sugg-list{
    // 上下  左右
    padding: 0 10px;
    
    .sugg-item{
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #eeeeee;
      
      .item-goodsname {
        // 文字不允许换行（单行文本）
        white-space: nowrap;
        // 溢出部分隐藏
        overflow: hidden;
        // 文本溢出
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }
  
  .history-box{    
    padding: 0 10px;
    
    .history-title{
      font-size: 13px;
      height: 40px;
      border-bottom: 1px solid #eeeeee;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .history-list{
      display: flex;
      //换行
      flex-wrap: wrap;
      
      .uni-tag{
        margin: 5px;
      }
    }
  }
  

</style>
