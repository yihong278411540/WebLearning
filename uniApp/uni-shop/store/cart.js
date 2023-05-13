export default {
  //为当前模块开启命名空间
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
    },
    
    //更新商品选中状态
    updateGoodsState(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if (findResult) {
        findResult.goods_state = goods.goods_state
        this.commit('m_cart/saveToStorage')
      }
    },
    
    //更新商品数量
    updateGoodsNum(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if (findResult) {
        findResult.goods_count = goods.goods_count
        this.commit('m_cart/saveToStorage')
      }
    },
    
    //删除商品
    removeGoods(state, goods) {
      // 调用数组的 filter 方法进行过滤
      state.cart = state.cart.filter(x => x.goods_id !== goods.goods_id)
      this.commit('m_cart/saveToStorage')
    },
    
    //商品反选
    updateAllGoodsState(state, newState) {
      console.log(newState)
      state.cart.forEach(x => x.goods_state = newState)
      this.commit('m_cart/saveToStorage')
    }
    
  },
  
  // 模块的 getters 属性
  getters: {
    //所有商品总数量
    total(state) {
      // let c = 0
      // state.cart.forEach(goods => c += goods.goods_count)
      // return c
      return state.cart.reduce((total, item) => total += item.goods_count, 0)
    },
    //已勾选商品数量
    checkedCount(state) {
      return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
    },
    checkedGoodsAmount(state) {                       
      return state.cart.filter(x => x.goods_state)
      .reduce((total, item) => total += item.goods_count * item.goods_price, 0)
      .toFixed(2)
    },
  },
  
}