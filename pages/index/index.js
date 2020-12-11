//index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
  * 自定义函数--跳转游戏页面
  */
  goToGame: function (e) {
    // 获取游戏模式
    let level = e.currentTarget.dataset.level

    // 游戏界面刷新时间（单位毫秒）
    let time = 0

    // 简单模式
    if(level=='easy'){
      time = 500
    }
    // 困难模式
    else if(level=='hard'){
      time = 200
    }

    // 跳转到游戏页面
    wx.navigateTo({
      url: '../game/game?time='+time,
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