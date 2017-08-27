<template>
    <div class="verify">
      <transition name="fade">
        <div class="pop-mask">
          <div class="popup">
            <form action="">
              <div class="popup-title">请输入验证码</div>
              <div class="popup-bone">
                <img src="http://fangshan.bjtcsj.com/api/user/captcha" alt="" class="img-responsive">
                <input type="text" id="verify_code"> <br>
                <label for="verify_code">看不清？换一张</label>
                  <span class="btn-confirm" id="btn-join" @click="finish">确定</span>
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
            }
        },
      props:['VerifyNotShow'],
      methods:{
        finish()  {
          console.log(this.$props);
          this.$props.VerifyNotShow();
        }
      },
        components: {},
        created(){

        }
    }
</script>

<style>
  label{
    color:#3c763d;
    font-size: 16px;
  }
</style>
