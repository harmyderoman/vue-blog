<template>
   <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Registration form</v-toolbar-title>
                <!-- <v-spacer></v-spacer> -->
                
              </v-toolbar>
              <v-card-text>
                <v-form ref="form"
                  v-model="valid"
                  lazy-validation>
                  <!-- <v-text-field 
                  prepend-icon="person" 
                  name="login" 
                  label="Login" 
                  type="text"
                  v-model="login"
                  
                  :rules="nameRules"
                  required>
                  </v-text-field> -->

                  <v-text-field
                    v-model="email"
                    prepend-icon="mail"
                    name="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>

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

                  <v-text-field 
                  id="confirm" 
                  prepend-icon="lock" 
                  name="confirm" 
                  label="Confirm Password" 
                  type="password"
                  :counter="6"
                  v-model="confirm"
                  :rules="confPassRules">
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary"
                @click="signUp"
                :loading="loading"
                :disabled="!valid || loading">Sign Up</v-btn>
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
      val: true,
      login: '',
      email: '',
      password: '',
      confirm: '',
      valid: false,
      nameRules: [
        v => !!v || 'Login is required'
      ],
      passRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be more than 5 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      confPassRules: [
        v => !!v || 'E-mail is required',
        v => v === this.password || "Password doesn't match"
      ]
    }
  },
  computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
  methods: {
    signUp(){
      if (this.$refs.form.validate()){
        const user = {
          // login: this.login,
          password: this.password,
          email: this.email
        }

        this.$store.dispatch('registUser', user)
          .then(() =>{
            this.$router.push('/')
          })
        // eslint-disable-next-line
        // console.log(user)
      }
    }
  }
}
</script>