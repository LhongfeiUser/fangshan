<template>
    <div class="verify">
      <transition name="fade">
        <div class="pop-mask">
          <div class="popup">
            <form action="">
              <div class="popup-title">请输入验证码</div>
              <div class="popup-bone">
                <!--http://fangshan.bjtcsj.com/api/user/captcha-->
                <img :src="imgSrc" alt="" class="img-responsive" id="img-responsive">
                <input type="text" id="verify_code"> <br>
                <label for="verify_code" @click="updateCpatcha" id="verify_hint">看不清？换一张</label>
                  <span class="btn-confirm sure" id="btn-join" @click="finish">确定</span>
              </div>
            </form>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
    export default {
        name: '',
        data(){
            return{
              imgSrc:"http://fangshan.bjtcsj.com/api/user/captcha",
            }
        },
      props:['VerifyNotShow'],
      methods:{
        updateCpatcha(){
          // 此处写更新图片方法
          return this.$http.get('http://fangshan.bjtcsj.com/api/refresh').then((res) => {

          })
        },
        finish()  {
          this.$props.VerifyNotShow();
        }
      },
        components: {},
        created(){

        }
    }
</script>

<style>
  #verify_hint{
    color:#3c763d;
    font-size: 12px;
    margin-left:4rem;
  }
  #verify_code {
    width: 80%;
    height: 1.5rem;
    margin-left: 1rem;
    margin-top: .5rem;
  }
  .sure{
    text-align: center;
  }
  #img-responsive{
    width:80%;
    height:3rem;
  }
</style>
