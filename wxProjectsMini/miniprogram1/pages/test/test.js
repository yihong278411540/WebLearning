// pages/testPage/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: 'init data',
    msgList:[{msg:'hello'},{msg: 'world'}],
    imgSrc: 'https://www.itheima.com/images/logo.png',
    randomNum: Math.random() * 10,
    count: 0,
    msg: "你好",
    array:['aaaa','bbbbb','cccc','dddddd'],
    userList:[{id:1, name:'小红', age:16},
    {id:2, name:'小明', age:17},
    {id:3, name:'小周', age:18}]
  },

  outerHander(e) {
    console.log(e)
  },

  changeCount() {
    this.setData({
      count: this.data + 1
    })
  },

  btnHandler(event) {
    console.log(event.target.dataset)
    console.log(event.target.dataset.info)
    this.setData({
      count: this.data.count + 1
    })
    console.log(this.data.count)
  },

  inputHandler(e) {
    this.setData({
      msg: e.detail.value
    })
    console.log(e.detail.value)
  },


    //发起get请求
    getInfo() {
      wx.request({
        url: 'https://www.escook.cn/api/get',
        method: 'GET',
        data: {
          name: 'zs',
          age: 20
        },
        success: (res) => {
          console.log(res.data)
        }
      })
    },
    //发起post请求
    getInfo2() {
      wx.request({
        url: 'https://www.escook.cn/api/post',
        method: 'POST',
        data: {
          name: 'ls',
          age: 33
        },
        success: (res) => {
          console.log(res.data)
        }
      })
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