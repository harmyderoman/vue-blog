import * as fb from 'firebase'

class Post{
    constructor(title, text, ownerId, imageSrc = '',date, id = null, author = 'Anon' ){
        this.title = title
        this.text = text
        this.ownerId = ownerId
        this.imageSrc = imageSrc
        this.date = date
        this.id = id
        this.author = author
    }
}

if (!Array.prototype.flat)
 Array.prototype.flat = function (depth = 1) {
   depth = isNaN(depth) ? 0 : Math.floor(depth);
   if (depth < 1) return this.slice();
   return [].concat(
      ...(depth < 2)
         ? this
         : this.map(v => Array.isArray(v) ? v.flat(depth - 1) : v)
   )
};

export default {
    state: {
        posts: []
    },
    mutations: {
        addPost(state, payload){
            state.posts.push(payload)
        },
        loadPosts(state, payload){
            state.posts = Object.entries(payload).flat().filter(item=> typeof(item) === "object" )
        }
    },
    actions: {
        async uploadImage({commit},payload){
            try{
                const imageExt = payload.image.name.slice(payload.image.name.lastIndexOf('.'))
                await fb.storage().ref(`posts/${payload.post.key}.${imageExt}`).put(payload.image)
                const src = await fb.storage().ref(`posts/${payload.post.key}.${imageExt}`).getDownloadURL()
                
                return src
            } catch(error){
                commit('setError', "Error while uploading image " + error.message)
                throw(error)
            }
        },
        async createPost({commit, getters, dispatch}, payload) {
            commit('clearError')
            commit('setLoading', true)

            const image = payload.img
            // const uid = getters.user.id

            try{
                var newPost = new Post(
                    payload.title, 
                    payload.text, 
                    getters.user.id, 
                    '',
                    payload.date,
                    Math.floor(Math.random() * 10000) + 1
                )

                const post = await fb.database().ref('posts').push(newPost)

                const src = await dispatch('uploadImage',{post, image})
                const info = await fb.database().ref(`authors/${getters.user.id}/info`).once('value')
                const authorInfo = info.val()
                
                await fb.database().ref('posts').child(post.key).update({
                    imageSrc: src,
                    id: post.key,
                    author: authorInfo.nickname
                })
                
                commit('setLoading', false)
                // dispatch('fetchPosts')
                commit('addPost', {
                    title: newPost.title,
                    text: newPost.text,
                    ownerId: getters.user.id,
                    imageSrc: src,
                    date: newPost.date,
                    id: post.key,
                    author: authorInfo.nickname
                })

                
            
            } catch(error){
                commit('setError', 'While creating new post: '+error.message)
                commit('setLoading', false)
                throw(error)
            }
           
            
        },
        async fetchPosts({commit}) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const fbPosts = await fb.database().ref('posts').once('value')
                const posts = fbPosts.val()
                commit('loadPosts', posts)

                commit('setLoading', false)
            } catch(error){
                commit('setError', error.message)
                commit('setLoading', false)

                throw error
            } 
            commit('setLoading', false)
        },

        // async findAuthorById(id){
        //   const info = (await fb.database().ref(`authors/${id}/info`).once('value')).val()
        //   return info.nickname
        // }
    },
    getters: {
        // postSize(state) {
        //     if(state.posts === null){
        //         return 0
        //     }
        //     return state.posts.length
        // },
        posts(state) {
            return state.posts
        },
        authorPosts(state) { return uid => {
                return state.posts.filter(post =>{
                    return post.ownerId === uid
                })
            }
        },
        postById(state){ return id => {
            return state.posts.find(post => post.id === id)}
        }
    }
}