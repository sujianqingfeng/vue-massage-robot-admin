<script setup>
import { fetchLoginApi, fetchCaptchaApi } from '~/api'

const { fetchApi: fetchLogin, loading } = useRequest({
  apiFn: fetchLoginApi
})

const formRef = ref(null)
const remember = ref(false)
const captchaSource = ref('')

const form = ref({
  username: '',
  password: '',
  captchaCode: '',
  captchaKey: ''
})

const rules = {
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  captchaCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
}

const router = useRouter()
const token = useStorage('token', '')
const submit = async () => {
  await formRef.value?.validate()
  const { error, data } = await fetchLogin(form.value)
  if (error) {
    return
  }
  const { accessToken } = data
  token.value = accessToken
  router.push('/dashboard')
}

const fetchCaptcha = async () => {
  const { error, data } = await fetchCaptchaApi()
  if (error) {
    return
  }
  const { captchaKey, captchaBase64 } = data
  form.value.captchaKey = captchaKey
  captchaSource.value = captchaBase64
}

fetchCaptcha()
</script>

<template>
  <div
    class="bg-[url(/bg-login.png)] bg-cover h-full w-full flex justify-center items-center"
  >
    <div class="w-235 h-117 bg-white rounded-1 flex">
      <div class="w-117.5 bg-[url(/bg-login-left.png)] bg-cover h-full">
        <div class="mt-14 text-center color-white text-7 leading-8.2">
          按摩机器人后台系统
        </div>
      </div>
      <div class="w-117.5 px-15 py-20">
        <div class="font-bold text-5 leading-5.8 mb-5">账号登录</div>
        <el-form ref="formRef" :model="form" :rules="rules">
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              class="h-11.5"
              placeholder="请输入账号"
            >
              <template #prefix>
                <div class="i-carbon-user-avatar"></div>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              class="h-11.5"
              type="password"
              placeholder="请输入密码"
            >
              <template #prefix>
                <div class="i-carbon-password"></div>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="captchaCode">
            <div class="w-full flex items-center gap-1.5">
              <el-input
                v-model="form.captchaCode"
                class="flex-auto h-11.5"
                placeholder="请输入图形验证码"
              />
              <img
                class="w-30 h-11.5 rounded-1.5 cursor-pointer"
                :src="captchaSource"
                @click="fetchCaptcha"
              />
            </div>
          </el-form-item>

          <el-form-item>
            <el-checkbox v-model="remember">
              <span class="color-#999999 text-3.5 leading-4.1 font-400">
                记住密码状态
              </span>
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="w-full"
              type="primary"
              @click="submit"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
