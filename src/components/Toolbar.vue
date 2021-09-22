<template>
  <v-app class="mx-auto overflow-hidden" height="400">
    <v-navigation-drawer app v-model="drawer" permanent clipped>
      <v-list nav dense>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-icon>
            <v-icon color="blue-grey darken-2">{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left color="#03A9F4">
      <v-app-bar-nav-icon @click="drawer = true" />
      <v-toolbar-title>Student</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
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
        { icon: "mdi-home School", text: "School", route: "/School2" },
        {
          icon: "mdi-home Student",
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
