import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';

import { apolloClient } from './main';

import { GET_POSTS, SIGNIN_USER, GET_CURRENT_USER } from './queries';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    user: null,
    loading: false,
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
    },

    setUser: (state, payload) => {
      state.user = payload;
    },

    setLoading: (state, payload) => {
      state.loading = payload;
    },

    clearUser: state => (state.user === null),
  },

  actions: {
    getCurrentUser: ({ commit }) => {
      commit('setLoading', true);
      apolloClient
        .query({
          query: GET_CURRENT_USER,
        })
        .then(({ data }) => {
          commit('setLoading', false);
          // Add user data to state
          commit('setUser', data.getCurrentUser);
          console.log(data.getCurrentUser);
        })
        .catch((err) => {
          commit('setLoading', false);
          console.error(err);
        });
    },

    getPosts: ({ commit }) => {
      commit('setLoading', true);
      apolloClient
        .query({
          query: GET_POSTS,
        })
        .then(({ data }) => {
          // Get data from actions to state via mutations
          // Commit passes data from actions to mutation functions
          commit('setPosts', data.getPosts);
          commit('setLoading', false);
        })
        .catch((err) => {
          commit('setLoading', false);
          console.error(err);
        });
    },

    signinUser: (_, payload) => {
      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload,
        })
        .then(({ data }) => {
          localStorage.setItem('token', data.signinUser.token);
          // To make sure created method is run in main.js (we run getCurrentUser), reload the page
          router.go();
        })
        .catch((err) => {
          console.error(err);
        });
    },

    signoutUser: async ({ commit }) => {
      // Clear user in state
      commit('clearUser');
      // Remove token in localStorage
      localStorage.setItem('token', '');
      // End session
      console.log('[apolloClient]', apolloClient);
      
      await apolloClient.resetStore();
      // Redirect to home - kick users out of any private pages
      router.push('/');
    },
  },

  getters: {
    posts: state => state.posts,
    loading: state => state.loading,
    user: state => state.user,
  },
});
