<template>
  <div class='wrapper-list'>
    <h3>文章列表</h3>
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px">
      <el-form-item label="作者姓名" prop="author">
        <el-input v-model="ruleForm.author"></el-input>
      </el-form-item>
      <el-form-item label="文章标题" prop="keyword">
        <el-input v-model="ruleForm.keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <div v-if='none'>查询结果为空</div>
    <div v-for="(item, index) in blogList" :key="index">
      <el-card class="box-card" >
          <div slot="header" class="clearfix">
            <span>{{ item.title}}</span>
            <span style="float: right; padding: 3px 0" type="text">
              {{ timer(item.createTime) }}
            </span>
          </div>
          <div class="text item">
            {{ item.content }}
          </div>
          <div>
            <el-button type="text" @click="del(item.id)">删除</el-button>
            <el-button type="text" @click="resetForm('ruleForm')">
              <router-link :to="{ path:'/blog/edit/' + item.id}">编辑</router-link>
            </el-button>
            <el-button type="text">
              <router-link :to="{ path:'/blog/detail/' + item.id}">查看详情</router-link>
            </el-button>
          </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { timer } from '@/assets/time'
export default {
  data () {
    return {
      blogList: [],
      ruleForm: {
        author: '',
        keyword: ''
      },
      none: false
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      axios.get('/api/api/blog/list').then((res) => {
        this.blogList = res.data.data
      }).catch((err) => {
        console.log(err)
      })
    },
    timer (it) {
      return timer(it)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.get('/api/api/blog/list', {
            params: this.ruleForm
          }).then((res) => {
            if (res.data.error === 0) {
              this.blogList = res.data.data
            } else {
              this.none = true
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    del (id) {
      this.$confirm('此操作将永久删除该博客, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.get('/api/api/blog/delete', {
          params: {
            id: id
          }
        }).then((res) => {
          this.getList()
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>
 .wrapper-list {
   width: 480px;
   margin: 20px auto;
   text-align: center;
 }
 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    margin-top: 20px;
  }

  a {
    text-decoration: none;
    color: #409EFF;
  }
</style>
