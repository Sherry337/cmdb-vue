import { login, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, users) {
      // console.log(8, users)
      const username = users.username.trim()
      return new Promise((resolve, reject) => {
        login(username, users.password).then(response => {
          setToken(response.token)
          commit('SET_TOKEN', response.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          // console.log(1, response)
          // commit('SET_NAME', response.name)
          commit('SET_NAME', response.name)
          // console.log(1, response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    // LogOut({ commit, state }) {
    //   console.log(1231, state)
    //   console.log(1, commit)
    //   return new Promise((resolve, reject) => {
    //     console.log(2, resolve)
    //     console.log(3, reject)
    //     logout(state.token).then(() => {
    //       console.log(4, state.token)
    //       commit('SET_TOKEN', '')
    //       commit('SET_NAME', '')
    //       removeToken()
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // }

    // 登出
    LogOut({ commit, state }) {
      // console.log(1231, state)
      // console.log(1, commit)
      return new Promise((resolve, reject) => {
        // console.log(2, resolve)
        // console.log(3, reject)
        // logout(state.token).then(() => {
        // console.log(4, state.token)
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        removeToken(state.token)
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        // console.log(5, resolve)
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
