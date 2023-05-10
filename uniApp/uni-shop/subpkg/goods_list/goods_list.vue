<template>
  <view>
    goodsList
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj: {
          query: '',
          cid: '',
          pageNum: 1,
          pagesize: 10,
        },
        goodsList: [],
        total: 0
      };
    },
    
    onLoad: (options) => {
      //接收传参
      console.log(options)
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      
      console.log(this.queryObj.cid)
      
      this.getGoodsList()
    },
    
    methods: {
      async getGoodsList() {
        const {data: res} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        if (res.meta.status !== 200) return uni.$showMsg()
        this.goodsList = res.message.goods
        this.total = res.message.total
        
        console.log(res)
      }
    }
    
  }
</script>

<style lang="scss">

</style>
