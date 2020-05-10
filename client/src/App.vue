<template>
  <v-app>
    <!-- Side Navigation -->
  <v-navigation-drawer
    app
    temporary
    fixed
    v-model="showSideNav"
  >
    <v-toolbar
      color="#BF653F"
      dark
      flat
    >
      <v-app-bar-nav-icon @click="toggleSideNav" />
      <router-link to="/" tag="span" style="cursor:pointer">
        <h1 class="title pl-3">VueShare</h1>
      </router-link>
    </v-toolbar>

    <v-divider></v-divider>

    <!-- Side Navbar Links -->
    <v-list nav>
      <v-list-item
        v-for="item in sideNavItems"
        :key="item.title"
        :to="item.link"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          {{ item.title }}
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

    <!-- Horizontal Navbar -->
  <v-app-bar
    app
    color="#3B125F"
    dark
  >
  <!-- App Title -->
    <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
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
        <v-icon class="hidden-sm-only" left>{{ item.icon }}</v-icon>
        {{ item.title }}
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

export default {
  name: 'App',

  data: () => ({
    showSideNav: false,
  }),
  computed: {
    horizontalNavItems() {
      return [
        { icon: 'mdi-chat', title: 'Posts', link: '/posts' },
        { icon: 'mdi-lock-open', title: 'Sign In', link: '/signin' },
        { icon: 'mdi-pencil', title: 'Sign Up', link: '/signup' },
      ];
    },
    sideNavItems() {
      return [
        { icon: 'mdi-chat', title: 'Posts', link: '/posts' },
        { icon: 'mdi-lock-open', title: 'Sign In', link: '/signin' },
        { icon: 'mdi-pencil', title: 'Sign Up', link: '/signup' },
      ];
    },
  },
  methods: {
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
