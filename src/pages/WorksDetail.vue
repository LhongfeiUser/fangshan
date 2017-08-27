<template>
  <div id="works-detail">
    <div class="works-show">
      <span class="ad-logo"><img src="../assets/images/logo-mini.png" alt="" class="img-responsive pull-left"/></span>
      <div class="media-box" id="media-box">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in slideUrl" @click="previewImage(index)">
              <img :src="item" class="img-responsive"/>
            </div>
          </div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div class="media-box media-brief">
        <div class="designer-info">
          <p>{{opus.works.title}}</p>
          <p v-if="opus.works.userCompany == '' ">{{opus.works.userName}}</p>
          <p v-else>{{opus.works.userName}} / {{opus.works.userCompany}}</p>
          <p>城市：{{opus.works.userCity}}</p>
        </div>
        <div class="designer-describe">
          <a href="#" @click="seen = true" v-if="!seen">
            <img src="../assets/images/arrow-down.png" alt="" class="img-responsive">
          </a>
          <div v-if="seen">
            <img src="../assets/images/separate.png" alt="" class="separate img-responsive"/>
            <div class="designer-cont" v-html="opus.works.content"></div>
          </div>
          <a href="##" @click="seen = false" v-if="seen"><img src="../assets/images/arrow-up.png" alt=""
             class="img-responsive"></a>
        </div>
      </div>
    </div>
    <Verify></Verify>
    <p>
    <div class="status-bar container">
        <span @click="like">
          <img v-if="opus.isLike === 1" class="icon" src="../assets/images/icon-liked.png">
          <img v-else class="icon" src="../assets/images/icon-like.png">
          {{ opus.works.countLike }} 赞
        </span>
      <span>{{ opus.works.countVote }} 已投票</span>
      <span class="pull-right" v-if="opus.works">排名：<span v-text="opus.works.rank"></span></span>
    </div>
    </p>
    <p class="btn-vote-group">
    <div class="text-center" v-if="$parent.user.isVoted === 0">
      <button class="btn-support" @click="vote">投 票</button>
    </div>
    <div class="text-center" v-else>
      <button class="btn-support btn-support-has" id="btn-support-has">已投票</button>
    </div>
    </p>
    <transition name="fade">
      <div class="pop-mask" v-if="show">
        <div class="popup">
          <form action="">
            <div class="popup-title">投票成功</div>
            <div class="popup-bone">
              <img src="../assets/images/gift.png" alt="" class="img-responsive">
              <router-link class="mascot-item" :to="{ name: 'lottery'}">
                <button class="btn-confirm" id="btn-join">参与抽奖</button>
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Verify from '../components/Verify.vue';
  export default {
    name: 'worksDetail',
    data () {
      return {
        // 解决property undefined
        opus: {
          'surplusVotes': null,
          'code': null,
          'isLike': 0,
          'works': {
            'id': 1,
            'userId': null,
            'activityId': null,
            'type': null,
            'title': null,
            'picUrl': null,
            'worksPicUrl': null,
            'audio': null,
            'content': null,
            'userHeadImg': null,
            'userNickname': null,
            'countLike': null,
            'countVote': null,
            'rank': null
          }
        },
        show: false,
        playing: false,
        slideUrl: [],
        seen: false
      }
    },
    components:{
      Verify
    },
    mounted () {
      document.title = '房山城市吉祥物';

      global.$('#works-detail').css('minHeight', window.innerHeight + 'px');

      this.$parent.getUser()
        .then(() => this.getWorksDetail())
        .then(() => this.initWeChat())
    },
    methods: {
      getWorksDetail () {
        return this.$http.get('http://fangshan.g-feeling.com/api/works/' + this.$route.params.worksId).then((res) => {
          let objRes = this.$parent.formatRes(res);
          if (objRes.code === 200) {
            this.opus = objRes;
            this.slideUrl = objRes.works.worksPicUrls.split(',')
          }
        })
          .then(() => new global.Swiper('.media-box .swiper-container', {
            pagination: '.media-box .swiper-pagination',
            paginationClickable: true,
            loop: true,
            prevButton: '.swiper-button-prev',
            nextButton: '.swiper-button-next',
            // autoplay: 2000,
            speed: 1000,
            effect: 'slide',
            autoplayDisableOnInteraction: false
          }))
      },
      like () {
        return this.$http.post('http://fangshan.g-feeling.com/api/works/' + this.opus.works.id + '/like', {
          emulateJSON: true
        }).then((res) => {
          let oRes = this.$parent.formatRes(res);
          if (oRes.code === 200) {
            this.opus.isLike = oRes.isLike;
            this.opus.works.countLike = oRes.countLike
          }
        })
      },
      vote () {
     /*   this.$get("http://fangshan.bjtcsj.com/api/user").then((data) => {
          console.log("数据：", data)
        });*/
        return this.$http.post('http://fangshan.g-feeling.com/api/works/' + this.opus.works.id + '/vote', {
          emulateJSON: true
        }).then((res) => {
          let oRes = this.$parent.formatRes(res);
          if (oRes.code === 200) {
            this.show = true;
            this.$parent.user = oRes.user
          }
        })
      },
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
              title: this.opus.works.title,
              desc: this.opus.works.content, // 分享描述
              link: window.location.origin + window.location.pathname, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: this.opus.works.picUrl // 分享图标
              // type: '', // 分享类型,music、video或link，不填默认为link
              // dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空
            });
            global.wx.onMenuShareTimeline({
              title: this.opus.works.title,
              link: window.location.origin + window.location.pathname,
              imgUrl: this.opus.works.picUrl
            })
          })
      },
      previewImage (index) {
        global.wx.previewImage({
          current: this.slideUrl[index],
          urls: this.slideUrl
        })
      }
    }
  }
</script>

<style scoped>
  #works-detail {
    background-color: #fff;
  }

  #btn-support-has {
    background: #979797 !important;
  }

  .content {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .works-show {
    background: #fff;
  }

  .media-box .container {
    padding-bottom: 2rem;
  }

  .btn-support {
    display: inline-block;
    width: 12.5rem;
    margin: 0.75rem 0;
    padding: 0.4rem 0;
    border: none;
    outline: none;
    background: none;
    border-radius: 1rem;
    font-size: 0.95rem;
    text-align: centr;
    background: #ff6c25;
    color: #fff;
    transition: .3s ease;
  }

  .designer-cont {
    text-align: justify;
  }

  .status-bar {
    font-size: 0.65rem;
    color: #777;
    background: #fff;
  }

  .status-bar span + span {
    margin-left: 1rem;
  }

  .status-bar img.icon {
    width: 0.7rem;
    height: 0.7rem;
    margin-bottom: 0.15rem;
  }

  .text-center {
    background: #fff;
  }

  .media-brief {
    margin-bottom: 0;
    background: none;
  }

  .designer-info {
    font-weight: bold;
  }

  .designer-describe a .img-responsive {
    width: 1rem;
  }

  .designer-describe .img-responsive {
    margin: 0.75rem auto;
  }

  #media-box {
    border: none
  }

  #media-box img {
    border: 0.025rem solid #efefef
  }

  .ad-logo {
    float: left;
    position: relative;
    left: 0.625rem;
    width: 1.8rem;
    margin-top: 0.625rem;
  }

  #btn-join {
    background: #ff6c25 !important;
    color: #fff;
  }
</style>
