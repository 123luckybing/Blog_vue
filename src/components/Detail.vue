<template>
  <div class='wrapper'>
    <h3>{{ detail.title }}</h3>
    <div class='info'>
      <span class='author'>{{ detail.author }}</span>
      <span class='time'>{{ detail.createTime }}</span>
    </div>
    <div class='content'>{{ detail.content }}</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      detail: {}
    }
  },
  mounted () {
    const { id } = this.$route.params
    axios.get('/api/api/blog/detail', {
      params: {
        id: id
      }
    }).then((res) => {
      console.log(res)
      this.detail = res.data.data
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
.wrapper {
  width: 800px;
  margin: 10px auto;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
  text-align: center;
}

.info {
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
  color: #ccc;
  font-size: 14px;
  padding: 0 30px;
}

.content {
  padding: 16px 20px;
  font-size: 14px;
  text-align: justify;
  border-top: 1px solid #e0e0e0;
}
</style>
