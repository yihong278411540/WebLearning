<template>
  <view>
    <view class="goods-list">
      <view v-for="(item,index) in goodsList" :key="index" @click="gotoDetail(item)">
        <my-goods :goods='item'></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj:{
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goodsList: [],
        total: 0,
        //节流
        isloading: false,
       
      };
    },
    
    onLoad(options) {
      //接收传参
      console.log(options)
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      console.log(this.queryObj)
      
      this.getGoodsList()
    },
    
    methods: {
      async getGoodsList(callback) {
        this.isloading = true
        
        const {data: res} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        if (res.meta.status !== 200) return uni.$showMsg()
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
        
        this.isloading = false
        callback && callback()
        
        console.log(res)
      },
      
      gotoDetail(item) {
        uni.navigateTo({
            url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
          })
      }
    },
    
    //上拉加载
    onReachBottom() {
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！');
      if (this.isloading) return
      
      this.queryObj.pagenum += 1
      this.getGoodsList()
    },
    onPullDownRefresh() {
      this.queryObj.pagenum = 1
      this.total = 0
      this.isloading = false
      this.goodsList = []
      
      this.getGoodsList(() => uni.stopPullDownRefresh())
    }
    
  }
</script>

<style lang="scss">
  
  
    
  

</style>
