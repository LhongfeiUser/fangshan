<template>
    <div class="verify">
      <transition name="fade">
        <div class="pop-mask" v-if="show">
          <div class="popup">
            <form action="">
              <div class="popup-title">请输入验证码</div>
              <div class="popup-bone">
                <img src="http://fangshan.bjtcsj.com/api/user/captcha" alt="" class="img-responsive">
                <input type="text" id="verify_code"> <br>
                <label for="verify_code">看不清？换一张</label>
                <router-link class="mascot-item" :to="{ name: '/works/?id'}">
                  <button class="btn-confirm" id="btn-join" @click="finish">确定</button>
                </router-link>
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
                show:false
            }
        },
      methods:{
        finish(){

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
