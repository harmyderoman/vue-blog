<template>
    <v-container>
      <v-layout row>
        <v-flex xs12>
          <h1 class="text--secondary mb-3">Personal Blog</h1>
          <h2 class="text--secondary mb-3"><i>{{ blogAuthor }}</i></h2>
        </v-flex>
      </v-layout>
       <v-layout row wrap>
    <v-flex
    xl3 lg4 md4
    xs12 sm6 pa-2 mb-3
    v-for="post in posts"
    :key="post.id">
      <v-card>
        <v-img
          class="white--text"
          height="200px"
          :src="post.imageSrc"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline ts">{{ post.title}}</span><br>
                <span class="ts">{{ post.author}}</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title>
          <div>
            <span class="grey--text">{{ post.date}}</span><br><br>
            <span>{{ (post.text.slice(0, 60)+ ' ...')}}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="primary" 
          :to="'/post/' + post.id">Read More</v-btn>
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
  props: 
    ['author','authorId']
  ,
  computed: {
    posts() {
      return this.$store.getters.authorPosts(this.authorId)
    },
    blogAuthor(){
      return this.author
    }
  }

}
</script>