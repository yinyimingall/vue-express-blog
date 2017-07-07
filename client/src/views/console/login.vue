<template>
  <div id="page">
  
    <h2 class="title">Blog</h2>
    <div class="container">
      <div v-show="isRegisterPage" class="form-style">
        <input v-model="username" placeholder="请输入用户名" class="input-error"></input>
        <!--<span class="error-message">{{ errorMsg.username.msg }}</span>-->
  
        <input v-model="password" placeholder="请输入密码"></input>
        <!--<span class="error-message">{{ errorMsg.password.msg }}</span>-->
  
        <input v-model="repeatPassword" placeholder="请重复密码"></input>
        <!--<span class="error-message">{{ errorMsg.repeatPassword.msg }}</span>-->
  
        <button class="btn-register">
          <span>注册</span>
        </button>
      </div>
      <div v-show="!isRegisterPage" class="form-style">
        <input v-model="username" placeholder="请输入用户名"></input>
        <input v-model="password" placeholder="请输入密码"></input>
      </div>
    </div>
  
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
export default {
  data() {
    return {
      isRegisterPage: true,
      username: '',
      password: '',
      repeatPassword: '',
      errorMsg: {
        username: { msg: '用户名重复', has: false },
        password: { msg: '校验中...', has: false },
        repeatPassword: { msg: '密码不一致', has: false }
      }
    }
  },
  watch: {
    username: function () {
      this.errorMsg.has = true
      this.checkUserName()
    }
  },
  methods: {
    checkUserName: debounce(function () {
      console.log('dolash')
      if (Math.random() > 0.5) {

      } else {

      }
    }, 500)
  }
}
</script>

<style lang="stylus" scoped>
.title {
  position: absolute;
  margin-left: 50%;
  color: #fff;
  left: -72px;
  top: 25%;
  text-align: center;
  
}
.container {
  display: flex;
  width:100%;
  height:100%;
  position: absolute;
  align-items:center;
  justify-content:center;
  //background:#0099cc;
  background: #2d3a4b;
  input {
    width: 100%;
    height: 2.6em;
    padding-left: 1em;
    margin-bottom: 1em;
    background: #283443;    
    border-radius: 4px;
    border: 1px solid #3c4655;
    outline:none;
  }
  input:focus {
    border: 1px solid yellow;
  }
  .form-style {
    width: 280px;
  }
  .error-message {
    position: absolute;
  }
}
</style>
