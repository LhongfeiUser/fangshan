<template>
    <div class="verify">

        <div class="pop-mask">
          <div class="popup">
            <form action="">
              <div class="popup-title">请输入验证码</div>
              <div class="popup-bone">
                <!--http://fangshan.bjtcsj.com/api/user/captcha-->
                <img :src="imgSrc" alt="" class="img-responsive" id="code">
                <input type="text" id="verify_code" autocomplete="false"> <br>
                <a @click="updateCpatcha" id="verify_hint">看不清？换一张</a>
                  <span class="btn-confirm sure" id="btn-join" @click="finish">确定</span>
              </div>
            </form>
          </div>
        </div>

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
          this.captcha='http://fangshan.bjtcsj.com/api/user/captcha?';
          this.imgSrc=this.captcha+Math.random();
        },
        finish()  {
          var val=$('#verify_code')[0].value;
          return this.$http.post('http://fangshan.bjtcsj.com/api/user/captcha',val).then((res)=>{
            if(res.code!=='10003'){
              this.$props.VerifyNotShow();
            }else {
              this.captcha='http://fangshan.bjtcsj.com/api/user/captcha?';
              this.imgSrc=this.captcha+Math.random();
            }
          })

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
  #code{
    width:80%;
    height:3rem;
  }
</style>
