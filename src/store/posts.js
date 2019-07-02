import * as fb from 'firebase'

class Post{
    constructor(title, text, ownerId, imageSrc = '',date, id = null ){
        this.title = title
        this.text = text
        this.ownerId = ownerId
        this.imageSrc = imageSrc
        this.date = date
        this.id = id
        
    }
}

export default {
    state: {
        author: '',
        posts: []
    },
    mutations: {
        createPost(state, payload){
            state.posts.push(payload)
            // eslint-disable-next-line
            console.log(state.posts)
        },
        loadPosts(state, payload){
            state.posts = payload
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
            // payload.id = Math.random()
            commit('clearError')
            commit('setLoading', true)

            const image = payload.img

            try{
                const newPost = new Post(
                    payload.title, 
                    payload.text, 
                    getters.user.id, //payload.author 
                    '',
                    payload.date,
                    Math.floor(Math.random() * 10000) + 1
                )

                const post = await fb.database().ref('posts').push(newPost)
                const imageExt = image.name.slice(image.name.lastIndexOf('.')+1)

                await fb.storage().ref(`posts/${post.key}.${imageExt}`).put(image)
                
                // const src = await fb.storage().ref(`posts/${post.key}.${imageExt}`).getDownloadURL()

                const src = await dispatch('uploadImage',{post, image})
   
                await fb.database().ref('posts').child(post.key).update({
                    imageSrc: src,
                    id: post.key
                })
                
                commit('setLoading', false)
                commit('createPost', {
                    title: newPost.title,
                    text: newPost.text,
                    ownerId: newPost.ownerId,
                    imageSrc: src,
                    date: newPost.date,
                    id: post.key,
                    
                })
            
            } catch(error){
                commit('setError', error.message)
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
                //console.log(posts)
                commit('loadPosts', posts)

                commit('setLoading', false)
            } catch(error){
                commit('setError', error.message)
                commit('setLoading', false)

                throw error
            } finally {
                commit('setLoading', false)
            }
        }
    },
    getters: {
        postSize(state) {
            if(state.posts === null){
                return 0
            }
            return state.posts.length
        },
        posts(state) {
            return state.posts
        },
        authorPosts(state) {
            return state.posts.filter(post =>{
                return post.ownerId === state.user.id
            })
        },
        sortByAuthor(state, uid) {
            return state.posts.filter(post =>{
                return post.ownerId === uid
            })
        },
        postById: state => id => {
            return state.posts.find(post => post.id === id)
            // return postId => {
            //     return state.posts.find(post => post.id === postId )
            // }
        },
        // getTodoById: state => id => {
        //     return state.todos.find(todo => todo.id === id);
        //   }
        firstPost(state) {
            return state.posts[0]
        },
        author(state){
            return state.author
        }
    }
}