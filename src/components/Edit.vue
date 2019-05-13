<template>
  <div class='form-wra'>
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <div>{{ detail.author }}</div>
      </el-form-item>
      <el-form-item label="创建时间">
        <div>{{ timer(detail.createTime) }}</div>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <el-input type='textarea' v-model="ruleForm.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import { timer } from '@/assets/time'
export default {
  data() {
    return {
      detail: {},
      ruleForm: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    timer(long) {
      return timer(long)
    },
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             const { id } = this.$route.params
            this.ruleForm.id = id
            const data = JSON.stringify(this.ruleForm)
            axios.post('/api/api/blog/update', data, {
              headers: {
                'Content-Type': 'application/json'
              }
            }).then((res) => {
              if (res.data.error === 0) {
                this.$message({
                  message: '更新博客成功',
                  type: 'success',
                  onClose: () => {
                    this.$router.push({ path:'/list' })
                  }
                });
              } else {
                this.$message({
                  message: '更新博客失败',
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
  },
  mounted() {
    const { id } = this.$route.params
    axios.get('/api/api/blog/detail', {
      params: {
        id: id
      }
    }).then((res) => {
      this.detail = res.data.data
      this.ruleForm.title = res.data.data.title
      this.ruleForm.content = res.data.data.content
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
.form-wra {
  width: 500px;
  margin: 20px auto;
}
</style>


