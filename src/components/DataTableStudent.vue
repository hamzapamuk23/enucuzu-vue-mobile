<template>
  <v-container class="mt-15">
    <v-data-table
      :headers="headers"
      :items="students"
      :items-per-page="5"
      class="elevation-3"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Student Crud</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
                >New İtem</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">New Item</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.surname"
                        label="Surname"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.number"
                        label="Number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.age"
                        label="Age"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.gpa"
                        label="Gpa"
                      ></v-text-field>
                    </v-col>
                    <v-select
                      v-model="editedItem.school"
                      :items="schools"
                      item-text="name"
                      item-value="id"
                      label="Select"
                      return-object
                      single-line
                    ></v-select>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="saveStudent"
                  >Save</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editStudent(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteStudent(item.id)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
export default {
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
      schools: [],
      editedItem: { id: null, school: {} },
      students: [],
      dialog: false,
    };
  },

  mounted() {
    this.getStudentList();
    this.getSchoolList();
  },

  methods: {
    async getStudentList() {
      await this.axios
        .get("http://localhost:8080/student")
        .then((response) => (this.students = response.data._embedded.students));
    },

    async getSchoolList() {
      await this.axios
        .get("http://localhost:8080/school/search/findByActiveTrue")
        .then((response) => (this.schools = response.data._embedded.schools));
    },

    async addStudent() {
      console.log(this.editedItem);
      await this.axios.post("http://localhost:8080/student/", this.editedItem);
      console.log(this.editedItem);
      this.getStudentList();
    },

    async updateStudent() {
      await this.axios.put(
        "http://localhost:8080/student/" + this.editedItem.id,
        this.editedItem
      );
      this.getStudentList();
    },

    editStudent(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    saveStudent() {
      if (this.editedItem.id == null || this.editedItem.id == "") {
        this.addStudent();
        this.close();
      } else {
        this.updateStudent();
        this.close();
      }
    },

    async deleteStudent(id) {
      await this.axios.delete("http://localhost:8080/student/" + id);
      this.getStudentList();
    },

    close() {
      this.dialog = false;
      this.clean();
    },

    clean() {
      this.editedItem = {};
    },
  },
};
</script>
