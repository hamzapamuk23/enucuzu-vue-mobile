<template>
  <v-container class="mt-15">
    <v-data-table
      :headers="headers"
      :items="schools"
      :items-per-page="5"
      class="elevation-3"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>School Crud</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <!-- <v-form class="mt-15 ms-15">
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.name"
                  label="Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.code"
                  label="Code"
                ></v-text-field>
              </v-col>
              <v-checkbox
                v-model="editedItem.active"
                label="Active"
              ></v-checkbox>
            </v-row>
          </v-form> -->

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
                        v-model="editedItem.code"
                        label="Code"
                      ></v-text-field>
                    </v-col>
                    <v-checkbox
                      v-model="editedItem.active"
                      label="Active"
                    ></v-checkbox>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="saveSchool"
                  >Save</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editSchool(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteSchool(item.id)">
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
        { text: "Code", value: "code" },
        { text: "Active", value: "active" },
        {
          text: "Actions",
          sortable: false,
          value: "actions",
        },
      ],
      schools: [],
      school: { id: null, name: "", code: "", active: false },
      editedItem: {},
      dialog: false,
      dialogSearch: false,
    };
  },

  mounted() {
    this.getSchoolList();
  },

  methods: {
    async getSchoolList() {
      await this.axios
        .get("http://localhost:8080/school/")
        .then((response) => (this.schools = response.data._embedded.schools));
    },

    async addSchool() {
      await this.axios.post("http://localhost:8080/school/", this.editedItem);
      this.getSchoolList();
    },

    async updateSchool() {
      await this.axios.put(
        "http://localhost:8080/school/" + this.editedItem.id,
        this.editedItem
      );
      this.getSchoolList();
    },

    saveSchool() {
      if (this.editedItem.id == null || this.editedItem.id == "") {
        this.addSchool();
        this.close();
      } else {
        this.updateSchool();
        this.close();
      }
    },

    editSchool(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteSchool(id) {
      await this.axios.delete("http://localhost:8080/school/" + id);
      this.getSchoolList();
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
