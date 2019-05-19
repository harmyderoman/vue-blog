import * as fb from 'firebase'

class User {
    constructor (id, nickname) {
        this.id = id
        this.nickname = nickname
    }
}
class Nickname {
  constructor (user){
    this.nickname = user.nickname,
    this.email = user.email
  }
}

export default{
    state: {
        user: null
    },
    mutations: {
        setUser (state, payload) {
            state.user = payload
        }
    },
    actions: {
        async registUser ({commit}, {nickname, email, password}) {
            commit('clearError')
            commit('setLoading', true)
            try {
              const user = await fb.auth().createUserWithEmailAndPassword(email, password)
              const newAuthor = new Nickname({nickname, email})
              console.log(newAuthor)
              await fb.database().ref('authors').push(newAuthor)
              
              commit('setUser', new User(user.uid, nickname))
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
          autoLoginUser({commit}, payload){
            commit('setUser', new User(payload.uid))
          },
          logOutUser({commit}) {
            fb.auth().signOut()
            commit('setUser', null)
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