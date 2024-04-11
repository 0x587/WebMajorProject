<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="用户名">
      <el-input v-model="form.username" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password" placeholder="请输入密码" show-password />
    </el-form-item>
    <el-form-item label="确认密码">
      <el-input v-model="form.password_" placeholder="请再次输入密码" show-password />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import api from '@/http/api';
import { ElMessage } from 'element-plus';

export default defineComponent({
  name: 'HomeView',
  data() {
    return {
      form: {
        username: '',
        password: '',
        password_: ''
      }
    }
  },
  mounted() {
    console.log(123);
  },
  methods: {
    login() {
      if (this.form.password !== this.form.password_) {
        ElMessage.error('两次密码不一致');
        return;
      }
      api.loginUser(this.form.username, this.form.password).then(res => {
        if (res) {
          ElMessage.success('登录成功');
        } else {
          ElMessage.error('登录失败');
        }
      })
    }
  }
});
</script>
