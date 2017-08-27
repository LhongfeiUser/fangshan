<template>
  <div id="app">
    <keep-alive include="news">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      user: {}
    }
  },
  created () {
    // Disable the rubber band effer
    document.body.addEventListener('touchstart', () => false)
  },
  methods: {
    formatRes (res) {
      let oRes = (typeof res.body === 'string') ? JSON.parse(res.body) : res.body;
      return oRes
    },
    getUser () {
      if (process.env.NODE_ENV === 'development') {
        return Promise.resolve(this.user)
      }

      // User already initialized
      if (this.user.id) {
        return Promise.resolve(this.user)
      }

      return this.$http.get('http://fangshan.g-feeling.com/api/user')
      .then((res) => {
        res = (typeof res.body === 'string') ? JSON.parse(res.body) : res.body
        if (res.code === 200) {
          this.user = res.user
          return this.user
        } else {
          // alert('getuser fail: ' + res.code) // 20000是需要微信授权登录的
          var code = this.$route.query.code
          if (typeof code === 'undefined') {
            // alert('no code')
            this.getWechatUser()
          } else {
            return this.$http.post('http://fangshan.g-feeling.com/api/login', {'code': code}, {emulateJSON: true})
            .then((res) => {
              res = (typeof res.body === 'string') ? JSON.parse(res.body) : res.body
              if (res.code === 200) {
                // alert('login')
                this.user = res.user
                return this.user
              } else {
                // alert('login fail' + res.code)
                this.getWechatUser()
              }
            })
          }
        }
      })
    },
    getWechatUser () {
      var originUrl = encodeURIComponent(window.location.origin + window.location.pathname)
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbaa926cfc5410355&redirect_uri=' + originUrl + '&response_type=code&scope=snsapi_base#wechat_redirect'
    },
    getWechatUserInfo () {
      var originUrl = encodeURIComponent(window.location.origin + window.location.pathname)
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbaa926cfc5410355&redirect_uri=' + originUrl + '&response_type=code&scope=snsapi_userinfo#wechat_redirect'
    },
    initWeChat () {
      return this.$http.get('http://fangshan.g-feeling.com/api/wechat/signature', {
        params: {
          'url': encodeURIComponent(window.location.href)
        }
      })
      .then((res) => {
        let oRes = this.formatRes(res)
        if (oRes.code !== 200) return Promise.reject()

        global.wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wxbaa926cfc5410355', // 必填，公众号的唯一标识
          timestamp: oRes.timestamp, // 必填，生成签名的时间戳
          nonceStr: oRes.noncestr, // 必填，生成签名的随机串
          signature: oRes.signature, // 必填，签名，见附录1
          jsApiList: [
            'onMenuShareAppMessage', // 微信会话
            'onMenuShareTimeline', // 微信朋友圈
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'previewImage'
          ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          success: function (res) {
            // alert(JSON.stringify(res))
            // alert('wx.config success!')
          }
        })

        return new Promise((resolve) => global.wx.ready(resolve))
      })
    }
  }
}
</script>
<style>
html,
body {
	max-width: 750px;
	min-width: 300px;
	margin: 0 auto;
	font-family: PingFangSC-Regular, "Microsoft YaHei", Helvetica, "Helvetica Neue", Arial, "Hiragino Sans GB", "Hiragino Sans GB W3", "WenQuanYi Micro Hei", "Microsoft YaHei UI", "Microsoft YaHei", sans-serif;
	background-color: #f8f8f8;
}

html {
	font-size: 40px
}

button{
  border: none;
  outline: none;
}

@meida(max-width: 768px) {
	.news-tab {
		width: 100%;
	}
}

@media screen and (max-width: 640px) {
	html {
		font-size: 34.133px;
	}
	.figure .figure-pic .img-responsive {
		max-width: 80%;
		margin-left: auto;
		margin-right: auto;
	}
}

@media screen and (max-width: 415px) {
	html {
		font-size: 22.133px;
	}
}

@media screen and (max-width: 375px) {
	html {
		font-size: 20px;
	}
}

@media screen and (max-width: 320px) {
	html {
		font-size: 17.067px;
	}
	.slogan .slogan-item {
		padding: 0.4rem 0.2rem;
	}
}

/*#app {
  position: fixed;
  width: 100%;
  height: 100%;

  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}*/
</style>
