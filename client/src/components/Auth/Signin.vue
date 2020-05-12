<template>
  <v-container class="text-center" mt-5 pt-5>

    <!-- Signin title -->
    <v-row class="title">
      <v-col>
        <h1>Welcome Back</h1>
      </v-col>
    </v-row>

    <!-- Signin Form -->
    <v-row class="form">
      <v-col cols="6">
        <v-card>
          <v-form @submit.prevent="handleSigninUser">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="username"
                  prepend-icon="mdi-account"
                  label="Username"
                  type="text"
                  required />
                <v-text-field
                  v-model="password"
                  prepend-icon="mdi-lock"
                  label="Password"
                  type="password"
                  required />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <div>
                  <v-btn
                    color="accent"
                    type="submit"
                  >
                  Signin
                  </v-btn>
                </div>
                <div>
                  <p>Need to setup an account?
                    <router-link to="/signup">Signup</router-link>
                  </p>
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Signin',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  watch: {
    user(value) {
      // If user value changes, redirect to home page
      if (value) {
        this.$router.push('/');
      }
    }
  },
  methods: {
    handleSigninUser() {
      this.$store.dispatch('signinUser', {
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  justify-content: center;

  .v-text-field {
    padding: 0 1em;
  }

  .v-text-field:first-child {
    margin-top: 3em;
  }

  p {
    margin-top: 1em;
    font-size: 12px;
  }
}
</style>
