<template>
	<div id="lottery">
		<div class="failed" v-if="isFailed">
			<img class="img-responsive" src="../assets/images/unhappy2.png">
			<div class="text">缘分就这样擦肩而过</div>
		</div>

		<div class="success" v-else>
			<div class="to-receive" v-if="isToReceive">
				<img class="img-responsive" src="../assets/images/happy2.png">
				<div class="text">抽中价值<span>10</span>元话费充值卡一张</div>
        <div class="phone">
          <img class="img-responsive pull-left" src="../assets/images/phone.png">
					<input type="text" placeholder="填写充值号码（安全防护）" required="required" v-model="mobile">
				</div>
				<button type="submit" class="accept-btn" @click="accept">领取</button>
			</div>

			<div class="received" v-else-if="isReceived">
				<img class="img-responsive" src="../assets/images/received.png">
				<span class="text">稍后工作人员会与你联系～</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'lottery',
  data () {
    return {
      mobile: ''
    }
  },
  computed: {
    isFailed () {
      document.title = '谢谢参与'
      return this.$parent.user.isDrawPrice === 0
    },
    isToReceive () {
      document.title = '恭喜您'
      return this.$parent.user.isDrawPrice === 1 && this.$parent.user.isReceived === 0
    },
    isReceived () {
      document.title = '领取成功'
      return this.$parent.user.isReceived === 1
    }
  },
  mounted () {
    this.lottery()
    this.initWeChat()
  },
  methods: {
    lottery () {
      return this.$http.post('http://fangshan.g-feeling.com/api/user/raffle/')
      .then((res) => {
        let oRes = this.$parent.formatRes(res)

        if (oRes.code === 200) {
          this.$parent.user = oRes.user
        }
      })
    },
    accept () {
      return this.$http.post('http://fangshan.g-feeling.com/api/user/receive/', {
        mobile: this.mobile
      }, {emulateJSON: true}).then((res) => {
        var oRes = this.$parent.formatRes(res)

        if (oRes.code === 200) {
          this.$parent.user = oRes.user
        } else {
          alert(oRes.message)
        }
      })
    },
    initWeChat () {
      return this.$parent.initWeChat()
      .then(() => {
        // alert('desc:' + this.desc)
        // alert(window.location.href)
        global.wx.hideAllNonBaseMenuItem()
        global.wx.showMenuItems({
          menuList: [
            'menuItem:refresh',
            'menuItem:share:appMessage',
            'menuItem:share:timeline',
            'menuItem:favorite'
          ] // 要显示的菜单项，所有menu项见附录3
        })
        global.wx.onMenuShareAppMessage({
          title: '【房山】一言不合就选吉祥物', // 分享标题
          desc: '听说参与投票就能抽奖，据说概率很高！', // 分享描述
          link: 'http://fangshan.g-feeling.com/works', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'http://fangshan.g-feeling.com/file/logo.png' // 分享图标
          // type: '', // 分享类型,music、video或link，不填默认为link
          // dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空
        })
        global.wx.onMenuShareTimeline({
          title: '【房山】一言不合就选吉祥物',
          link: 'http://fangshan.g-feeling.com/works',
          imgUrl: 'http://fangshan.g-feeling.com/file/logo.png'
        })
      })
    }
  }
}
</script>

<style scoped>
#lottery > div {
  position: absolute;
  height: 100%;
  width: 100%;
  padding: 20px;

  text-align: center;
}

#lottery > .failed {
  padding-top: 60px;
  background: url("../assets/images/lottery-bg2.png") no-repeat center center;
}

#lottery > .success {
	background: url("../assets/images/lottery-bg.png") no-repeat center center;
}

.received {
  padding-top: 40px;
}

.text {
  position: relative;
  top: -3rem;

  color: #333;
  font-size: 0.95rem;
}

.text span { text-decoration: underline; }
.received .text { font-size: 0.85rem; }

.phone{
	position: relative;
	width: 14rem;
  margin: 0 auto;
  padding: 0.625rem 0;

  border-bottom: 1px solid #fff;
}

.phone img{
	position: absolute;
  left: 0.5rem;
	width: 0.55rem;
}

.phone input{
	border: none;
  outline: none;
  background: none;

  width: 8rem;

  font-size: 0.7rem;
  text-align: center;
  color: #fff;
}

.phone input::-webkit-input-placeholder {
	color: #666;
}
.phone input :-moz-placeholder {
	color: #666;
}
.phone input::-moz-placeholder {
	color: #666;
}
.phone input :-ms-input-placeholder {
	color: #666;
}


.accept-btn {
  width: 12.5rem;
  margin: 1.825rem auto;
  padding: 0.35rem 0;

  font-size: 0.95rem;
  color: #ff6c25;

  border-radius: 2.05rem;
  background-color: #fff;
}
</style>
