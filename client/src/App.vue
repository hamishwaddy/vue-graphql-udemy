<template>
  <v-app>
    <!-- Side Navigation -->
  <v-navigation-drawer
    app
    temporary
    fixed
    v-model="showSideNav"
  >
    <v-app-bar
      color="white"
    >
      <v-app-bar-nav-icon @click="toggleSideNav" color="secondary" />
      <router-link to="/" tag="span" style="cursor:pointer">
        <h1 class="title pl-3">VueShare</h1>
      </router-link>
    </v-app-bar>

    <v-divider></v-divider>

    <!-- Side Navbar Links -->
    <v-list nav>
      <v-list-item
        v-for="item in sideNavItems"
        :key="item.title"
        :to="item.link"
      >
        <v-list-item-icon>
          <v-icon color="primary">{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          {{ item.title }}
        </v-list-item-content>
      </v-list-item>

      <!-- Signout button -->
      <v-list-item v-if="user" @click="handleSignoutUser">
        <v-list-item-icon>
          <v-icon>mdi-exit-to-app</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          Signout
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

    <!-- Horizontal Navbar -->
  <v-app-bar
    app
    color="white"
  >
  <!-- App Title -->
    <v-app-bar-nav-icon @click="toggleSideNav" color="secondary"></v-app-bar-nav-icon>
    <v-toolbar-title class="hidden-xs-only">
      <router-link to="/" tag="span" style="cursor: pointer">
        VueShare
      </router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

  <!-- Search Input -->
    <v-text-field
      flex
      prepend-icon="mdi-magnify"
      placeholder="Search posts"
      color="accent"
      single-line
      hide-details />

    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-xs-only">
      <v-btn
        text
        v-for="item in horizontalNavItems"
        :key="item.title"
        :to="item.link"
      >
        <v-icon class="hidden-sm-only" color="primary" left>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>

      <!-- Profile Button -->
      <v-btn
        text
        to="/profile"
        v-if="user"
      >
        <v-icon class="hidden-sm-only" left>mdi-account-box</v-icon>
        <v-badge right color="blue darken-2">
          <span slot="badge">1</span>
            Profile
        </v-badge>
      </v-btn>

      <!-- Signout Button -->
      <v-btn
        text
        v-if="user"
        @click="handleSignoutUser"
      >
        <v-icon class="hidden-sm-only" left>mdi-exit-to-app</v-icon>
        Signout
      </v-btn>

    </v-toolbar-items>
  </v-app-bar>

    <!-- App Content -->
    <v-content>
      <transition name="fade">
        <router-view/>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',

  data: () => ({
    showSideNav: false,
  }),
  computed: {
    ...mapGetters(['user']),
    horizontalNavItems() {
      let items = [
        { icon: 'mdi-chat', title: 'Posts', link: '/posts' },
        { icon: 'mdi-lock-open', title: 'Sign In', link: '/signin' },
        { icon: 'mdi-pencil', title: 'Sign Up', link: '/signup' },
      ];
      if (this.user) {
        items = [
          { icon: 'mdi-chat', title: 'Posts', link: '/posts' },
        ];
      }
      return items;
    },
    sideNavItems() {
      let items = [
        { icon: 'mdi-chat', title: 'Posts', link: '/posts' },
        { icon: 'mdi-lock-open', title: 'Sign In', link: '/signin' },
        { icon: 'mdi-pencil', title: 'Sign Up', link: '/signup' },
      ];
      if (this.user) {
        items = [
          { icon: 'mdi-chat', title: 'Posts', link: '/posts' },
          { icon: 'mdi-lead-pencil', title: 'Create Post', link: '/post/add' },
          { icon: 'mdi-account-box', title: 'Profile', link: '/profile' },
        ];
      }
      return items;
    },
  },
  methods: {
    handleSignoutUser() {
      this.$store.dispatch('signoutUser');
    },
    toggleSideNav() {
      this.showSideNav = !this.showSideNav;
    },

  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
