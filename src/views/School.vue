<template>
  <v-container>
    <DataTable
      :tableTitle="tableTitle"
      :headers="headers"
      ref="DataTable"
      :getSearch="getSearch"
      :responseKey="responseKey"
      get-url="http://localhost:8080/school/search/findBySchoolName?"
      delete-url="http://localhost:8080/school/"
      @editData="editSchool"
      @onShow="onShow"
    />
    <v-card class="mt-5 elevation-3" width="1150px">
      <v-form v-show="showForm">
        <v-toolbar color="#FFA000" flat>
          <v-toolbar-title>Edit School</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-icon class="mr-3" @click="saveSchool()" color="#03A9F4"
            >save</v-icon
          >
          <v-icon @click="showForm = !showForm" color="#B71C1C">cancel</v-icon>
        </v-toolbar>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="editedItem.code" label="Code"></v-text-field>
          </v-col>
          <v-checkbox v-model="editedItem.active" label="Active"></v-checkbox>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import DataTable from "@/components/DataTable";
export default {
  components: { DataTable },
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Code", value: "code" },
        { text: "Active", value: "active" },
        {
          text: "Actions",
          sortable: false,
          value: "actions",
        },
      ],
      getSearch: "&code=",
      showForm: false,
      responseKey: "schools",
      tableTitle: "School Crud",
      school: { id: null, name: "", code: "", active: false },
      editedItem: {},
    };
  },

  methods: {
    async addSchool() {
      await this.axios.post("http://localhost:8080/school/", this.editedItem);
      this.$refs.DataTable.getList();
      this.showForm = true;
    },

    onShow() {
      if (this.showForm) {
        this.showForm = false;
        this.clean();
      } else {
        this.showForm = true;
      }
    },

    async updateSchool() {
      await this.axios.put(
        "http://localhost:8080/school/" + this.editedItem.id,
        this.editedItem
      );
    },

    saveSchool() {
      if (this.editedItem.id == null || this.editedItem.id == "") {
        this.addSchool();
        this.clean();
      } else {
        this.updateSchool();
        this.clean();
      }
    },

    editSchool(item) {
      this.editedItem = Object.assign({}, item);
      this.onShow();
    },

    // close() {
    //   this.dialog = false;
    //   this.clean();
    // },

    clean() {
      this.editedItem = {};
    },
  },
};
</script>
