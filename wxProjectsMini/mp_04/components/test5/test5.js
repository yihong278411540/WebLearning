// components/test5/test5.js

const myBehavior = require('../../behaviors/behavior')

Component({
  
  behaviors:[myBehavior],

  /**
   * 组件的属性列表
   */
  properties: {
    count:Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    addCount(){
      this.setData({
        count:this.properties.count + 1
      })
      //事件绑定 子传父 3
      this.triggerEvent('sync',this.properties.count)
    },
  }
})
