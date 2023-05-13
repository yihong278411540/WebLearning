export default {
  // 开启命名空间
  namespaced: true,
  
  state: () => ({
    // 收货地址属性
    address: JSON.parse(uni.getStorageSync('address') || '{}')
  }),
  
  getters: {
    addStr(state) {
      if (!state.address.provinceName) return ''
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  },
  
  mutations: {
    updateAddress(state, addr) {
      state.address = addr
      this.commit('m_user/saveAddressToStorage')
    },
    
    saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    }
  }
  
  
  
}