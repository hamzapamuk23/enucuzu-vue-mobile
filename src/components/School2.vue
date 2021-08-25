<template>
  <v-app class="mx-auto overflow-hidden" height="400">
    <v-app-bar app clipped-left color="#03A9F4">
      <v-app-bar-nav-icon @click="drawer = true" />
      <v-toolbar-title>School</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>School</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon @click="deneme">mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Stundet</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <DataTable />
  </v-app>
</template>

<script>
import DataTable from "./DataTable";
export default {
  components: { DataTable },

  data() {
    return {
      drawer: false,
      group: null,
    };
  },

  methods: {
    deneme() {
      alert("asdasd");
    },
  },
};
</script>
