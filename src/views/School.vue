<template>
  <v-container>
    <data-table :tableTitle="tableTitle" :headers="headers" ref="DataTable" :getSearch="getSearch" :responseKey="responseKey" get-url="http://localhost:8080/school/search/findBySchoolName?" delete-url="http://localhost:8080/school/" @editData="editSchool" @onShow="onShow" />
    <v-card class="mt-5 mx-2 elevation-3" style="width:1142px">
      <v-form v-show="showForm">
        <v-toolbar color="#FFA000" flat>
          <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-icon class="mr-3" @click="saveSchool(), (snackbar = true)" color="#03A9F4">save</v-icon>
          <v-icon @click="showForm = !showForm" color="#B71C1C">cancel</v-icon>
        </v-toolbar>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="4" lg="4">
              <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="4" lg="4">
              <v-text-field v-model="editedItem.code" label="Code" counter="6"></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="4" lg="4">
              <v-checkbox v-model="editedItem.active" label="Active"></v-checkbox>
            </v-col>
          </v-row>
        </v-container>
        <v-snackbar v-model="snackbar" color="#B71C1C" :timeout="timeout">
          {{ text }}
        </v-snackbar>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import Vue from "vue";
import DataTable from "@/components/DataTable";
Vue.component("data-table", DataTable);
export default {
  components: { DataTable },
  data: () => ({
    headers: [
      { text: "Name", value: "name" },
      { text: "Code", value: "code" },
      { text: "Active", value: "active" },
      { text: "Actions", sortable: false, value: "actions" },
    ],
    text: "Kayıt başarılı",
    timeout: 1150,
    snackbar: false,
    formTitle: "",
    getSearch: "&code=",
    showForm: false,
    responseKey: "schools",
    tableTitle: "School Table",
    school: { id: null, name: "", code: "", active: false },
    editedItem: {},
  }),

  methods: {
    async addSchool() {
      await this.axios.post("http://localhost:8080/school/", this.editedItem);
      this.$refs.DataTable.getList();
      this.showForm = true;
    },

    onShow() {
      this.formTitle = "New School";
      this.clean();
      this.showForm = true;
    },

    async updateSchool() {
      await this.axios.put("http://localhost:8080/school/" + this.editedItem.id, this.editedItem);
      this.$refs.DataTable.getList();
    },

    saveSchool() {
      if (this.editedItem.id == null || this.editedItem.id == "") {
        this.addSchool();
        this.clean();
      } else {
        this.updateSchool();
      }
    },

    editSchool(item) {
      this.formTitle = item.name;
      this.editedItem = Object.assign({}, item);
      this.showForm = true;
    },

    clean() {
      this.editedItem = {};
    },
  },
};
</script>
