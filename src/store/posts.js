import * as fb from 'firebase';

class Post{
    constructor(title, text, author, img = '', id = null, date){
        this.title = title
        this.text = text
        this.author = author
        this.img = img
        this.id = id
        this.date = date
    }
}

export default{
    state: {
        author: 'Author',
        posts: [
            // { 
            //     author: 'Roma', 
            //     id: '1',
            //     title: "First Post", 
            //     img: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', 
            //     date: "14.05.2019", 
            //     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit explicabo, nihil reiciendis quo a quaerat cum error?'
            // },
            // {   
            //     author: 'Roma', 
            //     id: '2',
            //     title: "Second Post", 
            //     img: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', 
            //     date: "13.05.2019", 
            //     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit explicabo, nihil reiciendis quo a quaerat cum error?'
            // },
            // {   
            //     author: 'Roma', 
            //     id: '3',
            //     title: "Third Post", 
            //     img: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', 
            //     date: "10.05.2019", 
            //     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit explicabo, nihil reiciendis quo a quaerat cum error?'
            // },
            // {   
                
            //     author: 'Alexa', 
            //     id: '4',
            //     title: "Third Post", 
            //     img: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', 
            //     date: "10.05.2019", 
            //     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit explicabo, nihil reiciendis quo a quaerat cum error?'
            // }
          ]
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

            try{
                const newPost = new Post(
                    payload.title, 
                    payload.text, 
                    payload.author, 
                    'https://cdn-images-1.medium.com/max/1200/1*kz9D-JB0Lrk4RfhInh_3fg.png', 
                    payload.id,
                    payload.date)

                const post = await fb.database().ref('posts').push(newPost)
                
                commit('setLoading', false)
                commit('createPost', {
                    ...newPost,
                    id: post.key
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
                console.log(posts)
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