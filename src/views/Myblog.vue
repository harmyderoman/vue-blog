<template>
    <v-container>
      <v-layout row>
        <v-flex xs12>
          <h1>My Blog</h1>
        </v-flex>
      </v-layout>
       <v-layout row wrap>
    <v-flex
    xl3 lg4 md4
    xs12 sm6 pa-2 mb-3
    v-for="post in posts"
    :key="post.title">
      <v-card>
        <v-img
          class="white--text"
          height="200px"
          :src="post.img"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">{{ post.title}}</span><br>
                <span>{{ post.author}}</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title>
          <div>
            <span class="grey--text">{{ post.date}}</span><br><br>
            <span>{{ post.text}}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="primary" 
          :to="'/post/' + post.author.toLowerCase() + '/' + post.title.replace(/\s+/g, '').toLowerCase()">Read More</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="orange">Edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

  </v-layout>
    </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return{
       posts: [
        { author: 'Roma', 
        title: "First Post", 
        img: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', 
        date: "14.05.2019", 
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit explicabo, nihil reiciendis quo a quaerat cum error?'
        },
        { author: 'Roma', 
        title: "Second Post", 
        img: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', 
        date: "13.05.2019", 
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit explicabo, nihil reiciendis quo a quaerat cum error?'
        },
        { author: 'Roma', 
        title: "Third Post", 
        img: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', 
        date: "10.05.2019", 
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit explicabo, nihil reiciendis quo a quaerat cum error?'
        },
      ]
    }
  }
}
</script>