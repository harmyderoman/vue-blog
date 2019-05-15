export default{
    state: {
        author: 'Roma',
        posts: [
            { 
                author: 'Roma', 
                id: '1',
                title: "First Post", 
                img: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', 
                date: "14.05.2019", 
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit explicabo, nihil reiciendis quo a quaerat cum error?'
            },
            {   
                author: 'Roma', 
                id: '2',
                title: "Second Post", 
                img: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', 
                date: "13.05.2019", 
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit explicabo, nihil reiciendis quo a quaerat cum error?'
            },
            {   
                author: 'Roma', 
                id: '3',
                title: "Third Post", 
                img: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', 
                date: "10.05.2019", 
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit explicabo, nihil reiciendis quo a quaerat cum error?'
            },
            {   
                
                author: 'Alexa', 
                id: '4',
                title: "Third Post", 
                img: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', 
                date: "10.05.2019", 
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit explicabo, nihil reiciendis quo a quaerat cum error?'
            }
          ]
    },
    mutations: {
        createPost(state, payload){
            state.posts.push(payload)
        }
    },
    actions: {
        createPost({commit}, payload) {
            // payload.id = Math.random()

            commit('createPost', payload)
        }
    },
    getters: {
        postSize(state) {
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