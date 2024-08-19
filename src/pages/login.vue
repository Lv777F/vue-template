<script setup lang="ts">
  import { updateAuthorization } from '@/axios'
  import type { FormInstance, FormRules } from 'element-plus'

  defineOptions({
    name: 'LoginPage'
  })

  interface LoginForm {
    username: string
    password: string
  }

  const formRef = ref<FormInstance>()

  const form = reactive<LoginForm>({
    username: '',
    password: ''
  })

  const rules = reactive<FormRules<LoginForm>>({
    username: [
      { required: true, message: '请输入用户名' },
      {
        type: 'email',
        message: '请输入正确的邮箱地址'
      }
    ],
    password: [
      { required: true, message: '请输入密码' },
      {
        min: 6,
        max: 20,
        message: '密码长度为6-20位'
      }
    ]
  })

  const router = useRouter()

  const { execute: login } = useAxios<{ token: string }>(
    '/login',
    { method: 'post', data: form },
    {
      immediate: false,
      onSuccess(data) {
        localStorage.setItem('token', data.token)
        updateAuthorization(data.token)
        router.push('/')
      }
    }
  )

  const onSubmit = async (formEl?: FormInstance) => {
    if (!formEl) return
    try {
      await formEl.validate()
    } catch (e) {
      return
    }
    await login()
  }
</script>

<template>
  <ElContainer class="justify-center">
    <ElMain class="max-w-md space-y-4">
      <h1 class="text-center text-2xl">欢迎</h1>
      <ElForm
        ref="formRef"
        :model="form"
        :rules="rules"
        status-icon
        label-width="auto"
        label-position="top"
        size="large"
      >
        <ElFormItem label="用户名" prop="username">
          <ElInput v-model="form.username" autocomplete="username" />
        </ElFormItem>
        <ElFormItem label="密码" prop="password">
          <ElInput v-model="form.password" type="password" autocomplete="current-password" />
        </ElFormItem>
        <ElFormItem>
          <ElButton @click="onSubmit(formRef)" type="primary" class="w-full">登录</ElButton>
        </ElFormItem>
      </ElForm>
    </ElMain>
  </ElContainer>
</template>

<route lang="json">
{
  "meta": {
    "layout": "auth"
  }
}
</route>
