// components/test/test.js
Component({

  /**
   * 样式隔离
   * issolated 互不影响
   * apply-shared 外面影响自定义组件
   * shared 相互影响
   */
  options: {
    styleIsolation: 'isolated'
  },

  /**
   * 组件的属性列表
   * 主要存储外界传入的数据
   * properties对外属性
   */
  properties: {
    //第一种方式：简化的方式
    //max: Number,
    //第二种方式：完整的方式,需要默认值时使用
    max: {
      type: Number,
      value: 10 //默认值
    },
  },

  /**
   * 组件的初始数据
   * 主要存储私有数据
   */
  data: {
    count: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addcount() {
      if (this.data.count >= this.properties.max) return
      this.setData({
        count: this.data.count + 1
      })
      this.showcount()
    },
    showcount(){
      wx.showToast({
        title: `${this.data.count}`,
      })
    },

    addMaxcount() {
        this.setData({
          max: this.properties.max + 1
        })
    }
  }

})
