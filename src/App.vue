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
                <v-list-tile-title>John Leider</v-list-tile-title>
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

      </v-navigation-drawer>
      
       <v-toolbar dark color="primary">
        <v-toolbar-side-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer"
        ></v-toolbar-side-icon>

        <v-avatar
          :tile="1"
          :size="50"
          color="grey lighten-4"
        >
          <img src="../src/assets/VueBlogLogo.png" alt="avatar">
        </v-avatar>

        <v-toolbar-title class="white--text">Vue Blog</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-sm-and-down">
          
          <v-btn 
          flat
          v-for="link in links"
          :key="link.title">   
            {{ link.title}}
          <v-icon icon right>{{ link.icon}}</v-icon>
         </v-btn>

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
      drawer: false,
      links: [
        { title: 'My Blog', icon: 'star', url: '/myblog'},
        { title: 'New Post', icon: 'note_add', url: '/newpost'},
        { title: 'Log In', icon: 'person', url: '/login'},
        { title: 'Sign Up', icon: 'person_add', url:  '/signup' }
      ]
    }
  }
}
</script>
