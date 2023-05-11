export default {
  namespaced: true,
  
  // 模块的 state 数据
  state: () => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
  }),
  
  
  // 模块的 mutations 方法 用来修改模块属性的值
  mutations: {
    //添加商品
    addToCart(state, goods) {
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
      console.log(findResult)
      
      if (!findResult) {
        state.cart.push(goods)
      }else {
        findResult.goods_count++
      }
      
      // 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
      this.commit('m_cart/saveToStorage')
      
      console.log(state.cart.length)
    },
    
    //数据持久化 存储到本地
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    }
  },
  
  // 模块的 getters 属性
  getters: {
    total(state) {
      let c = 0
      state.cart.forEach(goods => c += goods.goods_count)
      return c
    }
  },
  
}