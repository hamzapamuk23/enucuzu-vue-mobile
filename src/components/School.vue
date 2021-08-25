<template>
  <v-container>
    <v-app>
      <v-app-bar app clipped-left color="#03A9F4">
        <v-app-bar-nav-icon />
        <v-toolbar-title>School</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-app-bar>
      <Popup></Popup>
      <v-data-table
        :headers="headers"
        :items="schools"
        :items-per-page="5"
        class="elevation-3"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item.id)">
            mdi-delete
          </v-icon>
        </template>

        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>School</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Dessert name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.calories"
                        label="Calories"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.fat"
                        label="Fat (g)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.carbs"
                        label="Carbs (g)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.protein"
                        label="Protein (g)"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
        </v-dialog>
      </v-data-table>
    </v-app>
  </v-container>
</template>

<script>
import Popup from "./Popup";
export default {
  components: { Popup },
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
      editedItem: {},
      dialog: false,
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

    async deleteItem(id) {
      await this.axios.delete("http://localhost:8080/school/" + id);
      this.getSchoolList();
    },

    editItem(item) {
      this.editedItem = item;
      console.log(this.editedItem);
      this.dialog = true;
    },
  },
};
</script>
