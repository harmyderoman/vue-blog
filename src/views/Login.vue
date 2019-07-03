<template>
   <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <!-- <v-spacer></v-spacer> -->
                
              </v-toolbar>
              <v-card-text>
                <v-form ref="form"
                  v-model="valid"
                  lazy-validation>
                  <v-text-field 
                  prepend-icon="person" 
                  name="email" 
                  label="Email" 
                  type="text"
                  v-model="email"
                  
                  :rules="nameRules"
                  required>
                  </v-text-field>

                  <v-text-field 
                  id="password" 
                  prepend-icon="lock" 
                  name="password" 
                  label="Password" 
                  type="password"
                  :counter="6"
                  v-model="password"
                  :rules="passRules">
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary"
                @click="onSubmit"
                :loading="loading"
                :disabled="!valid || loading">Log In</v-btn>
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
      email: '',
      password: '',
      valid: false,
      nameRules: [
        v => !!v || 'Email is required'
      ],
      passRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be more than 5 characters'
      ]
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSubmit(){
      if (this.$refs.form.validate()){
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('logonUser', user)
          .then(() =>{
              this.$router.push('/myblog')
            })
            .catch(() => {})
      }
    }
  },
  created() {
    if(this.$route.query['loginError']) {
      this.$store.dispatch('setError', 'Please log in to access to this page')
    }
  }
  // mounted(){
  //   if(this.$store.getters.user != null){
  //     this.$router.go(-1)
  //   }
  // }
}
</script>