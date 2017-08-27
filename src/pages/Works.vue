<template>
  <div id="works">
    <div id="works-banner">
      <div class="numbers">
        <span class="highlight" v-html="voteNumber"></span>人已参加
      </div>
      <img src="http://fangshan.g-feeling.com/file/banner.jpg" alt="" class="img-responsive" />
    </div>

    <div id="works-desc-wrapper">
      <div id="works-desc"  class="container">
        <h2>
          <img src="../assets/images/icon-works-head-r.png">
          <span>“FUN 征集 萌创意”</span>
          <img src="../assets/images/icon-works-head-l.png">
        </h2>
        <div>
          北京的房山征选吉祥物啦<br/>
          以下是全国30强，<br/>
          作品没有编号，顺序随机，得票全凭颜值<br/>
          每个微信ID只能投一票，<br/>
          投完即可参与抽奖，我不会告诉你奖品是充值卡
        </div>
      </div>
    </div>

    <div id="works-list" class="container">
      <div class="col-xs-6" v-for="item in worksList">
        <router-link class="item" :to="{ name: 'works-detail', params: {worksId: item.id}}">
          <img :src="item.picUrl" alt="" class="img-responsive"/>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'works',
  data () {
    return {
      worksList: [],
      voteNumber: 0
    }
  },
  mounted () {
    document.title = '房山吉祥物征集';
    this.$parent.getUser()
    .then(() => Promise.all([
      this.getWorksList(),
      this.initWeChat()
    ]))
  },
  methods: {
    initWeChat () {
      return this.$parent.initWeChat()
      .then(() => {
        // alert('desc:' + this.desc)
        // alert(window.location.href)
        global.wx.hideAllNonBaseMenuItem();
        global.wx.showMenuItems({
          menuList: [
            'menuItem:refresh',
            'menuItem:share:appMessage',
            'menuItem:share:timeline',
            'menuItem:favorite'
          ] // 要显示的菜单项，所有menu项见附录3
        });
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
    },
    getWorksList () {
      return this.$http.get('http://fangshan.g-feeling.com/api/works')
      .then((res) => {
        let oRes = this.$parent.formatRes(res)

        if (oRes.code === 200) {
          this.worksList = oRes.worksList
          this.voteNumber = oRes.voteNumber
        }
      })
    }
  }
}
</script>

<style scoped>
#works-banner .numbers {
  position: absolute;
  display: block;
  right: 0.625rem;
  padding: 5px 0.375rem 10px;
  font-size: 0.55rem;
  text-align: center;
  background: url(../assets/images/number-bg.png) repeat;
  color: #fff;
}

#works-banner .numbers .highlight {
  display: block;
  font-size: 0.85rem;
  color: #ff6c25;
}

#works-desc-wrapper {
  background-image: url("../assets/images/bg-works-desc-2.png");
  background-repeat: no-repeat;
  background-size: contain;
}

#works-desc {
  padding: 0.8rem 0;

  background-image: url("../assets/images/bg-works-desc.png");
  background-repeat: no-repeat;
  background-size: contain;

  color: #333;
  font-size: 0.75rem;
  text-align: center;
  line-height: 1.6
}

#works-desc h2 {
  margin-bottom: 0.375rem;

  color: #ff6c25;
  font-size: 0.8rem;
}

#works-desc h2 img {
  height: 1rem;
}

#works-desc h2 span {
  margin: 0 -0.375rem;
}

#works-list {
  padding: 0.25rem;

  background-image: url("../assets/images/bg-works-list.jpg");
  background-repeat: repeat-y;
  background-size: contain;
}

#works-list .col-xs-6 {
  padding: 0.375rem;
}

#works-list .item {
  display: block;
  position: relative;
  padding: 0.25rem;
  border: 2px solid #f3f3f3;

  color: #333;
  font-size: 0.6rem;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
