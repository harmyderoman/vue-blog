<template>
    <v-container>
      <v-layout>
        <v-flex>
          <h1>Home Page</h1>
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
            <span class="grey--text">{{ post.date }}</span><br><br>
            <span>{{ post.text}}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="primary" 
          :to="'/post/'+ post.id">Read More</v-btn>
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
   
    }
  },
  computed: {
    posts() {
      return this.$store.getters.posts
    }
  }
}
</script>

<style>
.ts {
	text-shadow: 
	-0   -1px 0 #000000,
	0    -1px 0 #000000,
	-0    1px 0 #000000,
	0     1px 0 #000000,
	-1px -0   0 #000000,
	1px  -0   0 #000000,
	-1px  0   0 #000000,
	1px   0   0 #000000,
	-1px -1px 0 #000000,
	1px  -1px 0 #000000,
	-1px  1px 0 #000000,
	1px   1px 0 #000000,
	-1px -1px 0 #000000,
	1px  -1px 0 #000000,
	-1px  1px 0 #000000,
	1px   1px 0 #000000;
}
</style>

