import * as fb from 'firebase';

class Post{
    constructor(title, text, author, imageSrc = '', id = null, date){
        this.title = title
        this.text = text
        this.author = author
        this.imageSrc = imageSrc
        this.id = id
        this.date = date
    }
}

export default{
    state: {
        author: 'Author',
        posts: []
    },
    mutations: {
        createPost(state, payload){
            state.posts.push(payload)
        },
        loadPosts(state, payload){
            state.posts = payload
        }
    },
    actions: {
        async createPost({commit, getters}, payload) {
            // payload.id = Math.random()
            commit('clearError')
            commit('setLoading', true)

            const image = payload.img

            try{
                const newPost = new Post(
                    payload.title, 
                    payload.text, 
                    'Anonimus', //payload.author 
                    '', 
                    payload.id,
                    payload.date)

                const post = await fb.database().ref('posts').push(newPost)
                const imageExt = image.name.slice(image.name.lastIndexOf('.'))
                const fileData = await fb.storage().ref(`posts/${post.key}.${imageExt}`).put(image)
                const imageSrc = fileData.metadata.downloadURLs[0]
                await fb.database().ref('posts').child(post.key).update({
                    imageSrc
                })
                
                commit('setLoading', false)
                commit('createPost', {
                    ...newPost,
                    id: post.key,
                    imageSrc: imageSrc
                })
                console.log(post)
            } catch(error){
                commit('setError', error.message)
                commit('setLoading', false)
                throw(error)
            }

            // commit('createPost', payload)
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
        authorPosts(state, author) {
            return state.posts.filter(post =>{
                return post.author === state.author
            })
        },
        sortByAuthor(state) {


            return auPosts
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