// pages/grade/grade.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grades: [],
    category: [],
    result: ["大一上", "大一下", "大二上", "大二下", "大三上", "大三下","大四上", "大四下"],
    showIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: ' 加载中',
    })

    var stu = wx.getStorageSync('student')
    const app = getApp()
    // var flag = false
    // 查询成绩
    wx.request({
      url: app.globalData.url_header+'grade/'+stu.sno+'/'+stu.spw,
      success: res=>{
        this.setData({
          grades : res.data.grade
        })
        console.log(res.data.grade)
        // 筛选
        wx.hideLoading()
        // flag = true
        console.log(res.data.grade[0])

        let result = []
        var i = 0
        result[i] = {year: res.data.grade[0].year, semester: res.data.grade[0].semester}
        for (let index = 0; index < res.data.grade.length; index++) {
          const element = res.data.grade[index];
          if(element.year != result[i].year || element.semester!=result[i].semester){
            i = i + 1
            result[i] = {year: element.year, semester: element.semester}
          }
        }
        this.setData({
          category: result
        })
      },
      fail: res=>{

      }
    })
    // 请求没有响应则循环等待
    // xun:() => {
    //   while(true){
    //     if(flag){
    //       break
    //     }
    //   }
    // }
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    })
  },


  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换模式
  clickTab: function (e) {
    var that = this;
    if (that.data.currentTab == e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current
      })
    }
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

  },

  panel: function (e) {
    if (e.currentTarget.dataset.index != this.data.showIndex) {
      this.setData({
        showIndex: e.currentTarget.dataset.index
      })
    } else {
      this.setData({
        showIndex: 0
      })
    }
  }
})