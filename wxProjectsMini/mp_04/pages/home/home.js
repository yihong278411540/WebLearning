// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0
  },

  //事件绑定 子传父 1
  syncCount(e) {
    console.log("syncCount")
    console.log(e.detail)
    this.setData({
      count: e.detail
    })
  },

  //获取子组件实例对象
  getChild() {
    const child = this.selectComponent('.customA')
    console.log(child)
    child.setData({
      count: child.properties.count + 1
    })
    // child.addCount()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})