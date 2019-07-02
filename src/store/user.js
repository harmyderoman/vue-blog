import * as fb from 'firebase'

class User {
    constructor (uid, nickname = 'Anonimus', email = 'no email') {
        this.id = uid,
        this.nickname = nickname,
        this.email = email
    }
}

export default {
    state: {
        user: null,
        userInfo: {}
    },
    mutations: {
        setUser (state, payload) {
            state.user = payload
        },
        cleareUser(state) {
            state.user = null
            state.userInfo = {}
        }
    },
    actions: {
        async registUser ({commit, dispatch}, { email, password, nickname}) {
            commit('clearError')
            commit('setLoading', true)
            try {
              await fb.auth().createUserWithEmailAndPassword(email, password)
              const uid = await dispatch('getUid')
              await fb.database().ref(`authors/${uid}/info`).set({nickname, email})
           
              commit('setUser', new User(uid, nickname, email))
              commit('setLoading', false)
            } catch (error) {
              commit('setLoading', false)
              commit('setError', error.message)
              throw error
            }
          },
          async logonUser ({commit}, { email, password}) {
            commit('clearError')
            commit('setLoading', true)
            try {
              const user = await fb.auth().signInWithEmailAndPassword(email, password)
              commit('setUser', new User(user.uid))
              commit('setLoading', false)
            } catch (error) {
              commit('setLoading', false)
              commit('setError', error.message)
              throw error
            }
          },
          async autoLoginUser({commit}, payload){
            const userInfo = (await fb.database().ref(`authors/${payload.uid}/info`).once('value')).val()
            commit('setUser', new User(payload.uid, userInfo.nickname, userInfo.email))
          },
          logOutUser({commit}) {
            fb.auth().signOut()
            commit('setUser', null)
          },
           getUid() {
              const user = fb.auth().currentUser
              return user ? user.uid : null
          }
    },
    getters: {
        user(state){
            return state.user;
        },
        loggedIn(state) {
          return state.user !== null
        }
    }
};