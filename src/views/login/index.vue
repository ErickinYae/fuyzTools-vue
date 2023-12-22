<template>
  <!-- 模板的根元素，表示组件的外层容器 -->
  <div class="login-container">
    <!-- 登录页面的容器 -->
    <div class="logo" />
    <!-- 网站Logo，这里使用了自闭合标签，可能是一个空白容器 -->
    <div class="form">
      <!-- 登录表单的容器 -->
      <h1>登录</h1>
      <!-- 页面标题 -->
      <el-card shadow="never" class="login-card">
        <!-- Element UI 组件库的卡片（Card）组件 -->
        <!-- shadow="never" 表示卡片没有阴影 -->
        <!-- class="login-card" 是自定义的CSS类，用于样式控制 -->
        <!--登录表单-->
        <el-form ref="form" :model="loginForm" :rules="loginRules">
          <!-- Element UI 的表单（Form）组件 -->
          <!-- ref="form" 是为了在Vue组件中获取表单实例的引用 -->
          <!-- :model="loginForm" 表示表单绑定的数据模型，即表单的数据 -->
          <!-- :rules="loginRules" 表示表单的验证规则 -->
          <el-form-item prop="mobile">
            <!-- Element UI 的表单项（Form Item）组件 -->
            <!-- prop="mobile" 表示该表单项对应的数据模型中的属性名 -->
            <el-input v-model="loginForm.mobile" placeholder="请输入手机号" />
            <!-- Element UI 的输入框（Input）组件 -->
            <!-- v-model="loginForm.mobile" 表示输入框与数据模型中的 mobile 属性双向绑定 -->
            <!-- placeholder="请输入手机号" 是输入框的占位符 -->
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item prop="isAgree">
            <el-checkbox v-model="loginForm.isAgree">
              用户平台使用协议
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button style="width:350px" type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        mobile: process.env.NODE_ENV === 'development' ? '13800000002' : '',
        password: process.env.NODE_ENV === 'development' ? 'hm#qd@23!' : '',
        isAgree: process.env.NODE_ENV === 'development' ? 'true' : 'false'
      },
      loginRules: {
        mobile: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }, {
          pattern: /^1[3-9]\d{9}$/,
          message: '手机号格式错误',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }, {
          pattern: /.{6,}/,
          message: '密码格式错误',
          trigger: 'blur'
        }],
        isAgree: [{
          validator: (rule, value, callback) => {
            // rule 校验规则
            // value 校验的值
            // callback 函数（必须执行，不然函数不会结束）
            value ? callback() : callback(new Error('请勾选平台使用协议'))
          }
        }]
      }
    }
  },
  methods: {
    login() {
      this.$refs.form.validate(async(isOK) => {
        if (isOK) {
          await this.$store.dispatch('user/login', this.loginForm)
          // Vuex 中的action 返回的promise
          // 跳转主页
          this.$router.push('/')
        }
      })
    }
  }
}
</script>
<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .logo {
    flex: 3;
    position: relative;
    background: url(../../assets/common/login_back.png)
      no-repeat center / cover;
    border-top-right-radius: 0px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 0px;
    z-index: 1;
    &::before {
      content: '';
      position: absolute;
      top: -90%;
      right: 0;
      bottom: 0;
      left: 2%;
      background: url(../../assets/common/cffex_logo.png) no-repeat left / 30%;
      z-index: 0; /* Place behind the logo */
    }
    &::after {
      content: '';
      position: absolute;
      top: -90%;
      right: 0;
      bottom: 0;
      left: 35%;
      background: url(../../assets/common/cffexit_logo.png) no-repeat left / 65%;
      z-index: -2; /* Place behind the test.png */
    }
  }
  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 176px;
    .el-card {
      border: none;
      padding: 0;
    }
    h1 {
      padding-left: 20px;
      font-size: 24px;
    }
    .el-input {
      width: 350px;
      height: 44px;
      .el-input__inner {
        background: #f4f5fb;
      }
    }
    .el-checkbox {
      color:#606266;
    }
  }
}
</style>
