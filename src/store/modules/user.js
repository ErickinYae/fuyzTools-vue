// eslint-disable-next-line no-unused-vars
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
const state = {
  token: getToken() // 从缓存中读取初始值
}

const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
    // 同步到缓存
  },
  removeToken() {
    // 删除Vuex的token
    state.token = null
    removeToken()
  }
}

const actions = {
  async login(context, data) {
    console.log(data)
    // TODO: 调用登录接口
    await login(data)
    // 返回Token：123456
    context.commit('setToken', '123456')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
