<template>
    <v-container>
      <v-layout row v-if="!postAdded">
        <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Write your new post</h1>
        <v-form v-model="valid" ref="form" validation class="mb-3">
          <v-text-field
            name="title"
            label="Title"
            type="text"
            v-model="title"
            required
            :rules="[v => !!v || 'Title is required']"
          ></v-text-field>
          <v-textarea
            name="text"
            label="Write something..."
            type="text"
            v-model="text"
            :rules="[v => !!v || 'Text is required']"
          ></v-textarea>
        </v-form>
        <v-layout row class="mb-3">
          <v-flex xs12>
            <v-btn class="warning">
              Upload Image
              <v-icon right dark>add_photo_alternate</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <img src="" height="100">
          </v-flex>
        </v-layout>
 
        <v-layout row>
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid"
              class="success"
              @click="createPost"
            >
              Create Post
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
        
      </v-layout>
      <v-layout v-else>
        <v-flex xs12 align-center>
          <h1>Your Post Created!</h1>
          <v-btn @click="postAdded=false">Add New Post</v-btn>
        </v-flex>
      </v-layout>
      
    </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return{
      postAdded: false,
      title: '',
      text: '',
      valid: false,
      author: 'Admin'
    }
  },
  methods: {
    createPost () {
      if (this.$refs.form.validate()) {
        const now = new Date().toDateString();
        let newId = this.$store.getters.postSize;
        const post = {
            author: this.$store.getters.author,
            id: (++newId).toString(),
            title: this.title,
            img: 'https://cdn-images-1.medium.com/max/1200/1*kz9D-JB0Lrk4RfhInh_3fg.png',
            date: now,
            text: this.text,
        }
        this.postAdded = true
        this.$store.dispatch('createPost', post)
        
          // this.title = ''
          // this.text = ''
          // this.titlevalid = false
          // this.author = 'Admin'
         // eslint-disable-next-line
          console.log(post)
        }
      }
    }
}
</script>