<template>
    <v-app>
      <v-navigation-drawer 
      app 
      temporary
      v-model="drawer"
      >
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="../src/assets/VueBlogLogo.png">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>Wellcome, {{ nickname }}!</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>

        <v-divider></v-divider>

        <v-list>
          <v-list-tile 
          v-for="link of links" 
          :to="link.url"
          :key="link.title">
            <v-list-tile-action>
              <v-icon icon left>{{ link.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title v-text="link.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list v-if="loggedIn">
            <v-list-tile flat @click="logOut"><v-icon icon left>exit_to_app</v-icon>
            Log  Out
            </v-list-tile>
          </v-list>
          <v-list v-else>
            <v-list-tile 
              flat
              v-for="link in loginLinks"
              :to="link.url"
              :key="link.title">
              <v-icon icon left>{{ link.icon}}</v-icon>   
                {{ link.title}}
            </v-list-tile>
          </v-list>

      </v-navigation-drawer>
      
       <v-toolbar dark color="primary">
        <v-toolbar-side-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer"
        ></v-toolbar-side-icon>

        <v-avatar
          :tile="avaTile"
          :size="50"
          color="grey lighten-4"
        >
          <img src="../src/assets/VueBlogLogo.png" alt="avatar">
        </v-avatar>

        <v-toolbar-title class="white--text">
          <router-link class="pointer" to="/" tag="span">
          Vue Blog
        </router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-sm-and-down">
          
          <v-btn 
          flat
          v-for="link in links"
          :to="link.url"
          :key="link.title">   
            {{ link.title}}
          <v-icon icon right>{{ link.icon}}</v-icon>
         </v-btn>

        <v-divider vertical dark></v-divider>

          <template v-if="loggedIn">
            <v-btn 
            flat
            @click="logOut">
              Log  Out
            <v-icon icon right>exit_to_app</v-icon>
            </v-btn>
          </template>
          <template v-else>
            <v-btn 
              flat
              v-for="link in loginLinks"
              :to="link.url"
              :key="link.title">   
                {{ link.title}}
              <v-icon icon right>{{ link.icon}}</v-icon>
            </v-btn>
          </template>
          
        </v-toolbar-items>
        

      </v-toolbar>

      <v-content>
          <router-view></router-view>
      </v-content>

      <v-footer app></v-footer>

        <template v-if="error">
          <v-snackbar
          :bottom="true"
          :multi-line="true"
          :timeout="5000"
          @input="closeError"
          value="true"
          >
          {{error}}
            <v-btn
            color="pink"
            flat
            @click="closeError"
            >
            Close
            </v-btn>
          </v-snackbar>
        </template>

    </v-app>  
</template>

<script>
export default {
  data() {
    return {
      nickname: 'Author',
      drawer: false,
      avaTile: true, // not round Logo
      loginLinks: [
        { title: 'Log In', icon: 'person', url: '/login'},
        { title: 'Sign Up', icon: 'person_add', url:  '/signup' }
      ]
    }
  },
  computed: {
  
    error() {
      return this.$store.getters.error
    },
    loggedIn() {
      return this.$store.getters.loggedIn
    },
    links(){
      if(this.loggedIn){
        return[
          { title: 'Home', icon: 'home', url: '/'},
          { title: 'My Blog', icon: 'star', url: '/myblog'},
          { title: 'New Post', icon: 'note_add', url: '/newpost'}
        ]
      } else{
        return [
          { title: 'Home', icon: 'home', url: '/'}
        ]
      }
    }
  },
  methods: {
    closeError(){
      this.$store.dispatch('clearError')
    },
    logOut(){
      this.$store.dispatch('logOutUser')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.pointer{
  cursor: pointer;
}
</style>

