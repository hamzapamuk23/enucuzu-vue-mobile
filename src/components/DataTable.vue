<template>
  <v-container>
    <v-card>
      <v-data-table :headers="headers" :items="items" class="elevation-3" :loading="loading" :options.sync="options" :server-items-length="totalElements" :items-per-page="5">
        <!-- sort-by.sync="sortBy" -->
        <template v-slot:top>
          <v-toolbar color="#FFA000" flat>
            <v-toolbar-title>{{ tableTitle }}</v-toolbar-title>
            <v-divider class="mx-5" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-row>
              <v-col class="mr-5">
                <v-text-field v-model="search.name" placeholder="Search" append-icon="mdi-magnify" hide-details @input="getList()"></v-text-field>
              </v-col>
            </v-row>
            <v-icon @click="$emit('onShow', showForm)">add</v-icon>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="$emit('editData', item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteSchool(item.id)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showForm: false,
      search: { name: "" },
      items: [],
      loading: false,
      options: {},
      totalElements: 0,
      page: 0,
      // sortBy: "id",
    };
  },

  watch: {
    options: {
      handler() {
        this.getList();
        // this.sortby();
      },
    },
    deep: true,
  },

  props: ["headers", "getUrl", "deleteUrl", "tableTitle", "responseKey", "getSearch"],

  methods: {
    async getList() {
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      let pageNumber = page - 1;
      this.loading = true;
      await this.axios.get(this.getUrl + "name=" + this.search.name + this.getSearch + "&page=" + pageNumber + "&size=" + itemsPerPage + "&sort=" + (sortBy[0] === undefined ? "id" : sortBy[0]) + "," + (sortDesc[0] === true ? "desc" : "asc")).then((response) => ((this.items = response.data._embedded[this.responseKey]), (this.totalElements = response.data.page.totalElements)));
      this.loading = false;
    },

    async deleteSchool(id) {
      await this.axios.delete(this.deleteUrl + id);
      this.getList();
    },
  },
};
</script>
