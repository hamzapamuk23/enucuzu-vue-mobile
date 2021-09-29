<template>
  <v-container>
    <DataTable :headers="headers" :tableTitle="tableTitle" :responseKey="responseKey" :getSearch="getSearch" ref="DataTable" @editData="editStudent" @onShow="onShow" get-url="http://localhost:8080/student/search/findAllSearch?" delete-url="http://localhost:8080/student/" />
    <v-card class="mt-5 elevation-3">
      <v-form v-show="showForm">
        <v-toolbar color="#FFA000" flat>
          <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-icon class="mr-3" @click="saveStudent()" color="#03A9F4">save</v-icon>
          <v-icon @click="showForm = !showForm" color="#B71C1C">cancel</v-icon>
        </v-toolbar>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4" lg="4">
              <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="4">
              <v-text-field v-model="editedItem.surname" label="Surname"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="4">
              <v-text-field v-model="editedItem.number" label="Number"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="4">
              <v-text-field v-model="editedItem.age" label="Age" type="number"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="4">
              <v-text-field v-model="editedItem.gpa" label="Gpa"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="4">
              <v-select v-model="editedItem.school" :items="schools" item-text="name" item-value="id" label="Select" return-object single-line></v-select>
            </v-col>
          </v-row>
        </v-container>
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
        { text: "Surname", value: "surname" },
        { text: "Number", value: "number" },
        { text: "Age", value: "age" },
        { text: "Gpa", value: "gpa" },
        { text: "School", value: "school.name" },
        {
          text: "Actions",
          sortable: false,
          value: "actions",
        },
      ],
      formTitle: "",
      getSearch: "&surname=&number=&age=&gpa=&schoolName=",
      showForm: false,
      tableTitle: "Student Crud",
      responseKey: "students",
      schools: [],
      editedItem: { id: null, school: {} },
      students: [],
    };
  },

  mounted() {
    this.getSchoolList();
  },

  methods: {
    onShow() {
      this.formTitle = "New Student";
      this.clean();
      this.showForm = true;
    },

    async getSchoolList() {
      await this.axios.get("http://localhost:8080/school/search/findByActiveTrue").then((response) => (this.schools = response.data._embedded.schools));
    },

    async addStudent() {
      console.log(this.editedItem);
      await this.axios.post("http://localhost:8080/student/", this.editedItem);
      this.$refs.DataTable.getList();
    },

    async updateStudent() {
      await this.axios.put("http://localhost:8080/student/" + this.editedItem.id, this.editedItem);
      this.$refs.DataTable.getList();
    },

    editStudent(item) {
      this.formTitle = item.name + " " + item.surname;
      this.editedItem = Object.assign({}, item);
      this.showForm = true;
    },

    saveStudent() {
      if (this.editedItem.id == null || this.editedItem.id == "") {
        this.addStudent();
        this.clean();
      } else {
        this.updateStudent();
        this.clean();
      }
    },

    clean() {
      this.editedItem = {};
    },
  },
};
</script>
