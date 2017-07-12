<template>
  <div id="page">
    <div class="container">
      <div class="content">
        <h1 class="title-log">Blog</h1>
        <div v-show="isRegisterPage" class="form-style">
          <div class="round" :class="{ 'round-reg': isRegisterPage}" @click="toggleLogin"></div>
          <input v-model="username" placeholder="请输入用户名" id="register-input"></input>
          <span class="input-message" :class="{ success: regInputMsg.username == 'OK', warning: regInputMsg.username == '用户名已存在'}">{{ regInputMsg.username }}</span>
          <input v-model="password" type="password" placeholder="请输入密码"></input>
          <span class="input-message" :class="{ success: regInputMsg.password == 'OK', warning: regInputMsg.password == '密码不一致'}">{{ regInputMsg.password }}</span>
          <input v-model="repeatPassword" type="password" placeholder="请重复密码" @keyup.enter="register"></input>
          <span class="input-message" :class="{ success: regInputMsg.repeatPassword == 'OK', warning: regInputMsg.repeatPassword == '密码不一致'}">{{ regInputMsg.repeatPassword }}</span>
          <button class="btn" @click.enter="register">
            <span>注册</span>
          </button>
        </div>
        <div v-show="!isRegisterPage" class="form-style">
          <div class="round" :class="{ 'round-reg': isRegisterPage}" @click="toggleLogin"></div>
          <input v-model="username" placeholder="请输入用户名" autofocus id="signin-input"></input>
          <input v-model="password" placeholder="请输入密码" type="password" @keyup.enter="signin"></input>
          <button class="btn" @click.enter="signin" type="button" value="登录">
            <span>登录</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import api from '../../api/api'
export default {
  data() {
    return {
      isRegisterPage: false,
      username: '',
      password: '',
      repeatPassword: '',
      regInputMsg: {
        username: '',
        password: '',
        repeatPassword: ''
      },
      regState: {
        username: false,
        password: false
      }
    }
  },
  mouted() {
   
  },
  computed: {

  },
  watch: {
    username: function () {
      this.regInputMsg.username = '校验中...'
      if (this.username == '') {
        this.regInputMsg.username = ''
        this.regState.username = false;
      } else {
        this.checkUserName()
      }
    },
    password: function () {
      if (!(this.password == '' && this.repeatPassword == '')) {
        this.regInputMsg.password = '校验中...'
        this.regInputMsg.repeatPassword = '校验中...'
      }
      this.checkPassword()
      this.checkTwoPassWord()
    },
    repeatPassword: function () {
      if (!(this.password == '' && this.repeatPassword == '')) {
        this.regInputMsg.repeatPassword = '校验中...'
      }
      this.checkTwoPassWord()
    }
  },
  methods: {
    toggleLogin() {
      this.emptyInput()

      this.isRegisterPage = !this.isRegisterPage;
      this.$nextTick(function () {
        let reg$ = document.querySelector('#register-input')
        let signin$ = document.querySelector('#signin-input')
        if (this.isRegisterPage) {
          reg$.focus()
        } else {
          signin$.focus()
        }
      })
    },
    checkUserName: debounce(function () {
      if (this.username == '') {
        this.regState.username = false
        return;
      }
      api.searchNameExist(this.username)
        .then((res) => {
          if (res.status == 200) {
            if (res.data.code == 200) {
              this.regInputMsg.username = 'OK'
              this.regState.username = true
            }
            if (res.data.code == 401) {
              this.regInputMsg.username = '用户名已存在'
              this.regState.username = false
            }
          }
        })
        .catch((res) => {
          console.log(res)
        })
    }, 500),
    checkPassword: debounce(function () {
      if (this.password != '') {
        this.regInputMsg.password = 'OK'
      } else {
        this.regInputMsg.password = ''
        this.regInputMsg.repeatPassword = ''
      }
    }, 500),
    checkTwoPassWord: debounce(function () {
      if (this.password == this.repeatPassword) {
        if (this.password == '') {
          this.regInputMsg.password = ''
          this.regInputMsg.repeatPassword = ''
          this.regState.password = false
          return;
        }
        this.regInputMsg.password = 'OK'
        this.regInputMsg.repeatPassword = 'OK'
        this.regState.password = true
      } else {
        this.regState.password = false
        this.regInputMsg.repeatPassword = '密码不一致'
      }
    }, 500),
    checkAllReg() {
      if (this.regState.username && this.regState.password) {
        return true
      }
      if (!this.regState.username) {
        this.regInputMsg.username = '无效用户名'
      }
      if (!this.regState.password) {
        this.regInputMsg.password = '无效密码'
        this.regInputMsg.repeatPassword = '无效密码'
      }
      return false
    },
    register() {
      if (this.checkAllReg()) {
        let params = {
          username: this.username,
          password: this.password
        }
        api.register(params)
          .then((res) => {
            if (res.status == 200) {
              if (res.data.code == 200) {
                this.toggleLogin()
                this.$message({
                  message: '注册成功',
                  type: 'success'
                })
              }
              if (res.data.code == 401) {
                this.$message({
                  message: '注册失败',
                  type: 'warning'
                })
              }
            }

          })
          .catch((res) => {
            console.log(res)
          })
      }
    },
    checkAllLogin() {
      if (this.username !== '' && this.password !== '') {
        return true
      }
      this.password = ''
      this.$message({
        message: '用户名或密码不正确',
        type: 'error'
      })
      return false
    },
    signin() {
      if (this.checkAllLogin()) {
        let params = {
          username: this.username,
          password: this.password
        }
        api.signin(params)
          .then((res) => {
            if (res.status == 200) {
              if (res.data.code == 200) {
                this.$message({
                  message: '登录成功',
                  type: 'success'
                })
                this.$router.push({ path: 'console' })
              }
              if (res.data.code == 401) {
                this.password = ''
                this.$message({
                  message: '用户名或密码不正确',
                  type: 'error'
                })
              }
            }
          })
          .catch((res) => {

          })
      }

    },
    emptyInput() {
      this.username = ''
      this.password = ''
      this.repeatPassword = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.container {
  display: flex;
  width:100%;
  height:100%;
  position: absolute;
  align-items:center;
  justify-content:center;
  background: #2d3a4b;

  .title-log {
    color: #fff;
    font-size: 72px;
    margin-bottom: 100px;
    text-align: center;
  }
  .round {
    position: absolute;
    top: -34px;
    left: -34px;
    width: 68px;
    height: 68px;
    border-radius: 50%;
    background: #56A36C;
    cursor:pointer;
  }
  input {
    color: #fff;
    box-sizing: border-box;
    width: 280px;
    height: 35px;
    padding-left: 1em;
    margin-bottom: 14px;
    background: #283443;    
    border-radius: 4px;
    border: 1px solid #3c4655;
    outline:none;
    margin-left: 100px;
    transition-duration: 0.2s;
  }
  input:focus {
    border: 1px solid yellow;
  }
  .form-style {
    position: relative;
    overflow: hidden;
    width: 480px;
    height: 185px;
    margin-bottom: 100px;
  }
  .btn {
    width: 280px;
    margin-left: 100px;
    height: 38px;
    color: #2d3a4b;
    font-size: 15px;
    border: 1px solid #c4c4c4;
    border-radius: 3px;
    background: #fff;
    outline: none;
    transition-duration: 0.2s;
  }
  .btn:hover {
    cursor: pointer;
    color: #fff;
    background : #20a0ff;
    border-color: #fff;
  }
  .input-message {
    margin-left: 10px;
    font-size: 14px;
    color:  #FFFF99; // 黄色
  }
  .warning {
    color: #FE4365; // 红色
  }
  .success {
    color: #33CC33; // 绿色
  }
  .round-reg {
    background: #FF6666;
  }
  
}
</style>
