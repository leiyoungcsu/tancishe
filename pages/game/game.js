// pages/game/game.js
// ================
// 游戏参数设置
// ================
// 蛇的身长
var t = 3

// 记录蛇的运动轨迹，用数组记录每个方块的坐标点
var snakeMap = []

// 蛇身单元格的宽度
var w = 20

// 方向代码:上1，下2，左3，右4
var direction = 1

// 蛇的初始坐标
var x = 0
var y = 0

// 食物的初始坐标
var foodX = 0
var foodY = 0

// 画布的宽和高
var width = 320
var height = 320

// 游戏界面刷新的间隔时间，单位毫秒
var time = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: 0

  },

  /**
   * 自定义函数--启动游戏
   */
  gameStart: function() {
    // 初始化蛇身长度
    t = 3
    // 初始化蛇身坐标
    snakeMap = []

    // 随机生成贪吃蛇的初始蛇头坐标
    x = Math.floor(Math.random() * width / w) * w
    y = Math.floor(Math.random() * height / w) * w

    // 随机生成蛇的初始前进方向
    direction = Math.ceil(Math.random() * 4)

    // 随机生成食物的初始坐标
    foodX = Math.floor(Math.random() * width / w) * w
    foodY = Math.floor(Math.random() * height / w) * w

    // 每隔time毫秒后刷新一次游戏画面
    var that = this
    this.interval = setInterval(function() {
      that.gameRefresh()
    }, time)

  },

  /**
   * 自定义函数--绘制贪吃蛇
   */
  drawSnake: function() {
    let ctx = this.ctx

    // 设置蛇身的填充颜色
    ctx.setFillStyle('lightblue')

    // 绘制全部蛇身
    for (var i = 0; i < snakeMap.length; i++) {
      ctx.fillRect(snakeMap[i].x, snakeMap[i].y, w, w)
    }
  },

  /**
   * 自定义函数--绘制食物
   */
  drawFood: function() {
    let ctx = this.ctx

    // 设置食物的填充颜色
    ctx.setFillStyle('red')

    // 绘制食物
    ctx.fillRect(foodX, foodY, w, w)
  },

  /**
   * 自定义函数--游戏画面刷新
   */
  gameRefresh: function() {
    // 在随机位置绘制一个食物
    this.drawFood()

    // 将当前坐标添加到贪吃蛇运动轨迹数组中
    snakeMap.push({
      'x': x,
      'y': y
    })

    // 数组只保留蛇身长度的数据，如果蛇前进了则删除最旧坐标
    if (snakeMap.length > t) {
      snakeMap.shift()
    }

    // 绘制贪吃蛇
    this.drawSnake()

    // 吃到食物判断
    if (foodX == x && foodY == y) {
      // 吃到一次食物加10分
      let score = this.data.score + 10
      this.setData({
        score: score
      })

      // 随机生成下一个食物坐标
      foodX = Math.floor(Math.random() * width / w) * w
      foodY = Math.floor(Math.random() * height / w) * w

      // 在新的位置绘制食物
      this.drawFood()

      // 蛇身长度+1
      t++
    }

    // 在画布绘制全部内容
    this.ctx.draw()

    // 根据蛇头方向移动下一个位置
    switch (direction) {
      case 1:
        y -= w
        break
      case 2:
        y += w
        break
      case 3:
        x -= w
        break
      case 4:
        x += w
        break
    }

    // 碰撞检测，返回值为0表示没有撞到
    let code = this.detectCollision()

    if (code != 0) {
      // 游戏停止
      clearInterval(this.interval)

      var msg = ''
      if (code == 1) {
        msg = '失败原因：撞到了墙壁'
      } else if (code == 2) {
        msg = '失败原因：撞到了蛇身'
      }

      wx.showModal({
        title: '游戏失败，是否重来？',
        content: msg,
        success:res=>{
          if(res.confirm){
            // 重新开始游戏
            this.gameStart()
          }
        }
      })
    }

  },


  /**
   * 自定义函数--监听方向键：上
   */
  up: function() {
    direction = 1
  },

  /**
   * 自定义函数--监听方向键：下
   */
  down: function() {
    direction = 2
  },

  /**
   * 自定义函数--监听方向键：左
   */
  left: function() {
    direction = 3
  },

  /**
   * 自定义函数--监听方向键：右
   */
  right: function() {
    direction = 4
  },

  /**
   * 自定义函数--碰撞检测
   */
  detectCollision: function() {
    // 如果蛇头碰撞到了四周的墙壁，游戏失败
    if (x > width || y > height || x < 0 || y < 0) {
      return 1
    }

    // 如果蛇头撞到了蛇身，游戏失败
    for (var i = 0; i < snakeMap.length; i++) {
      if (snakeMap[i].x == x && snakeMap[i].y == y) {
        return 2
      }
    }

    // 没有碰撞
    return 0

  },

  /**
   * 自定义函数--重启游戏
   */
  restartGame: function () {
    // 关闭刷新效果
    clearInterval(this.interval)
    // 重新开始游戏
    this.gameStart()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options.time)

    // 更新游戏刷新时间
    time = options.time

    // 创建画布上下文
    this.ctx = wx.createCanvasContext("myCanvas")

    // 开始游戏
    this.gameStart()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    clearInterval(this.interval)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})