import Vue from 'vue';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';

import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

//  Setup ApolloClient
export const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  // Include auth token with requests made to backend
  fetchOptions: {
    credentials: 'include',
  },
  request: (operation) => {
    // If no token with key of 'token' in localStorage, add it
    if (!localStorage.token) {
      localStorage.setItem('token', '');
    }

    // Operation adds the token to an authorization header, which is sent to backend
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.log('[networkError]', networkError);
    }

    if (graphQLErrors) {
      Object.keys(graphQLErrors).forEach((error) => {
        console.dir(error);
      });
    }
  },
});

Vue.use(VueApollo);

export const apolloProvider = new VueApollo({ defaultClient: apolloClient });

Vue.config.productionTip = false;

new Vue({
  apolloProvider,
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    // execute getCurrentUser query
    this.$store.dispatch('getCurrentUser');
  },
}).$mount('#app');
