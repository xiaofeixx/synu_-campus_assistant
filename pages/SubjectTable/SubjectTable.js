Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
     //上课长度全部默认为两节课
    course: [],
    showModal: -1
  },
/**
   * 按钮点击事件
   */
  changeYL: function (e) {
    console.log(e)
    let index = e.currentTarget.dataset.index
    this.setData({
      showModal: index
    })
    console.log(index)
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: -1
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var stu = wx.getStorageSync('student')
    const app = getApp()
    // 查询课程表
    wx.request({
      url: app.globalData.url_header+'schedule/'+stu.sno+'/'+stu.spw,
      success: res=> {
        this.setData({
          course : res.data.courses
        })
        console.log(res.data.courses)
      }
    })
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
