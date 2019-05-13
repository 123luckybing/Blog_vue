<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="文章标题" prop="title">
      <el-input v-model="ruleForm.title"></el-input>
    </el-form-item>
    <el-form-item label="文章内容" prop="content">
      <el-input type="textarea" v-model="ruleForm.content"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
</el-form>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      ruleForm: {
        title: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请选择文章内容', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const data = JSON.stringify(this.ruleForm)
            axios.post('/api/api/blog/new', data, {
              headers: {
                'Content-Type': 'application/json'
              }
            }).then((res) => {
              if (res.data.error === 0) {
                this.$message({
                  message: '新建博客成功',
                  type: 'success',
                  onClose: () => {
                    this.$router.push({ path:'/list' })
                  }
                });
              } else {
                this.$message({
                  message: '新建博客失败',
                  type: 'error'
                });
              }
            }).catch((err) => {
              console.log(err)
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
  }
}
</script>

<style scoped>
.demo-ruleForm {
  width: 800px;
  margin: 30px auto;
}
</style>


