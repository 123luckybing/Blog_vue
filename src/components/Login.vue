<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" class='login'>
    <el-tab-pane label="登录" name="first">
      <el-form :model="login" :rules="rules" ref="login" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="login.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="login.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginIn('login')">登录</el-button>
          <el-button @click="resetForm('login')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="注册" name="second">
      <el-form :model="res" :rules="rules" ref="res" label-width="100px">
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="res.realName" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="res.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="res.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resIn('res')">注册</el-button>
          <el-button @click="resetForm('res')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      activeName: 'first',
      login: {
        username: '',
        password: ''
      },
      res: {
         username: '',
         password: ''
      },
      rules: {
        username: {
          required: true, message: '请输入用户名', trigger: 'blur'
        },
        password: {
          required: true, message: '请输入密码', trigger: 'blur'
        },
        realName: {
           required: true, message: '请输入真实姓名', trigger: 'blur'
        }
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    loginIn(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('/api/api/user/login',this.login, {
              headers: {
                'Content-Type': 'application/json'
              }
            }).then((res) => {
              if (res.data.error === 0) {
                 // 种cookie
                document.cookie = `username=${this.login.username}`
                this.$message({
                  message: '恭喜你，登陆成功',
                  type: 'success',
                  onClose: () => {
                    this.$router.push('/list')
                  }
                });
              } else {
                this.$message({
                  message: '登陆失败',
                  type: 'error'
                });
              }
            }).catch((err) => {
              this.$message({
                message: '登陆失败',
                type: 'error'
              });
            })
          }
      })
    },
    resIn(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('/api/api/user/register',this.res, {
              headers: {
                'Content-Type': 'application/json'
              }
            }).then((res) => {
              // 种cookie
              document.cookie = `username=${this.res.username}`
              this.$message({
                message: '恭喜你，注册成功',
                type: 'success',
                onClose: () => {
                  this.$router.push('/list')
                }
              });
            }).catch((err) => {
              this.$message({
                message: '注册失败',
                type: 'error'
              });
            })
          }
      })
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
  },
  mounted () {

  }
}
</script>


<style scoped>
.login {
  width: 400px;
  margin: 20px auto;
}
</style>
