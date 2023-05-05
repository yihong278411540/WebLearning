// components/test3/test3.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    //纯数据字段
    options:{
      //正则：指定所有_开头的字段为纯数据字段
      pureDataPattern:/^_/
    },

    _rgb: {
      r: 0,
      g: 0,
      b: 0
    },
    fullColor: '0, 0, 0'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeR(){
      this.setData({
        '_rgb.r': this.data._rgb.r + 5 > 255 ? 255 : this.data._rgb.r + 5
      })
    },
    changeG(){
      this.setData({
        '_rgb.g': this.data._rgb.g + 5 > 255 ? 255 : this.data._rgb.g + 5
      })
    },
    changeB(){
      this.setData({
        '_rgb.b': this.data._rgb.b + 5 > 255 ? 255 : this.data._rgb.b + 5
      })
    },
    _randomColor() {
      this.setData({
        _rgb: {
          r: Math.floor(Math.random() * 256),
          g: Math.floor(Math.random() * 256),
          b: Math.floor(Math.random() * 256),
        }
      })
    }
  },

  observers: {
    // '_rgb.r, _rgb.g, _rgb.b': function (r1, g1, b1) {
    //   this.setData({
    //     fullColor: `${r1}, ${g1}, ${b1}`
    //   })
    // }

    //使用通配符监听对象所有属性的变化
    '_rgb.**': function (obj) {
      this.setData({
        fullColor: `${obj.r}, ${obj.g}, ${obj.b}`
      })
    }
  },

  //组件生命周期
  lifetimes: {
    //刚被创建好，不能调用setData
    created() {
      console.log('created-------')
    },
    //初始化完成，this.data已被初始化完成
    attached() {
      console.log('attached-------')
    },
    //退出界面，清理数据
    detachecd() {
      console.log('detachecd-------')
    }
  },

  //组件所在页面生命周期
  pageLifetimes: {
    show() {
      console.log('show-------')
      this._randomColor()
    },
    hide(){
      console.log('hide-------')
    },
    resize(){
      console.log('resize-------')
    }
  }
  
})
