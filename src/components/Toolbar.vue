<template>
  <v-app class="mx-auto overflow-hidden" height="400">
    <v-app-bar app clipped-left color="#FFCA28">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>School Project</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" clipped color="#FF6F00">
      <!-- permanent=>app_bar_nav_icon'u kapatır -->
      <v-list nav dense>
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-item-icon>
            <v-icon dark color="blue-grey darken-2">{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      group: null,
      links: [
        { icon: "home", text: "School", route: "/School" },
        {
          icon: "school",
          text: "Student",
          route: "/Student",
        },
      ],
    };
  },

  methods: {
    deneme() {
      alert("asdasd");
    },
  },
};
</script>
