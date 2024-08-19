<script setup lang="ts">
  import logo from '@/assets/logo.svg'

  defineOptions({
    name: 'DefaultLayout',
    beforeRouteEnter(to, from, next) {
      if (!localStorage.getItem('token')) {
        next('/login')
      } else {
        next()
      }
    }
  })

  const isDark = useDark()
</script>

<template>
  <ElContainer class="min-h-screen">
    <ElHeader
      class="flex items-center justify-between border-b-[var(--el-menu-border-color)] border-b"
    >
      <img :src="logo" class="size-8" />
      <ElSpace :size="20">
        <ElSwitch
          size="large"
          v-model="isDark"
          style="--el-switch-on-color: #999; --el-switch-off-color: #ccc"
        >
          <template #active-action>
            <i-ep-moon />
          </template>
          <template #inactive-action>
            <i-ep-sunny />
          </template>
        </ElSwitch>
        <ElAvatar>
          <i-ep-user />
        </ElAvatar>
      </ElSpace>
    </ElHeader>
    <ElContainer>
      <ElAside>
        <ElMenu router class="h-full" :default-active="$route.path">
          <ElMenuItem index="/">首页</ElMenuItem>
          <ElMenuItem index="/setting">设置</ElMenuItem>
        </ElMenu>
      </ElAside>
      <ElMain>
        <RouterView />
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>
