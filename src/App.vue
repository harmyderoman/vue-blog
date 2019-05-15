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
        <v-list v-if="logined">
            <v-list-tile flat><v-icon icon left>exit_to_app</v-icon>
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
          <template v-if="logined">
            <v-btn flat>
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

    </v-app>  
</template>

<script>
export default {
  data() {
    return {
      logined: false,
      nickname: 'Author',
      drawer: false,
      avaTile: true, // not round Logo
      links: [
        { title: 'Home', icon: 'home', url: '/'},
        { title: 'My Blog', icon: 'star', url: '/myblog'},
        { title: 'New Post', icon: 'note_add', url: '/newpost'}
        
      ],
      loginLinks: [
        { title: 'Log In', icon: 'person', url: '/login'},
        { title: 'Sign Up', icon: 'person_add', url:  '/signup' }
      ]
    }
  }
}
</script>

<style scoped>
.pointer{
  cursor: pointer;
}
</style>

