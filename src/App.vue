<template>
  <v-app class="mx-auto overflow-hidden" style="height: 100%;">
    <v-app-bar app clipped-left color="primary" style="width: 100%;">
      <v-autocomplete @keyup.enter="goToFilterProduct()" v-model="selected" :loading="loading" :items="items"
        :search-input.sync="search" cache-items class="mx-4" flat rounded dark hide-no-data hide-details
        label="What do you want to buy cheap?" solo-inverted>
      </v-autocomplete>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
      <v-container v-if="main">
        <v-layout>
          <v-flex class="xs12 sm12 md12 lg12 ml-7">
            <v-card @click="goToProductDetail(index)" v-for="(product,index) in products" :key="product.id" width="25%"
              class="mt-5 mx-2 elevation-3"
              style="display:inline-block; overflow:hidden; white-space: nowrap; text-overflow: ellipsis;">
              <!-- <a :href="product.url" style="text-decoration:none; color:#1b1b1b; "> -->
              <v-img size="10px" :src="product.imageUrl"></v-img>
              <v-card-title class="pa-0" style=" font-size:10px; font-family:source_sans_proregular;">{{product.name}}
              </v-card-title>
              <v-divider></v-divider>
              <v-card-subtitle align="center" class="pa-2" style="font-size:50%"><strong>{{product.price}} TL
                  ({{product.platformName}})</strong></v-card-subtitle>
              <!-- </a> -->
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    search: null,
    loading: false,
    items: [],
    selected: null,
    input: "",
    products: [],
    main: true,
    states: []
  }),
  watch: {
    search(val) {
      val && val !== this.selected && this.querySelections(val)
    },
  },
  mounted() {
    this.getProduct()
  },
  methods: {
    async getProduct() {
      const response = await this.axios.get("http://localhost:8080/product?size=24")
      this.totalPage = response.data.page.totalPages
      this.totalElements = response.data.page.totalElements
      this.size = response.data.page.size

      this.products = response.data._embedded.products
      response.data._embedded.products.forEach(product => {
        this.states.push(product.name)
      });
    },
    goToFilterProduct() {
      this.main = false
      localStorage.setItem('searchName', this.search)
      this.$router.push({ path: '/ProductMobile' })
      this.selected = ""
    },
    goToProductDetail(index) {
      this.main = false
      this.$router.push({ path: "/ProductDetailMobile", query: { productId: this.products[index].id, main: false } })
    },
    querySelections(v) {
      this.loading = true
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)
    }
  }
};
</script>

<style>
</style>
