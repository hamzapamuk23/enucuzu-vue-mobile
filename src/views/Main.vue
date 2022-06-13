<template>
    <v-container>
        <v-layout>
            <v-flex class="xs12 sm12 md12 lg12 ml-7">
                <v-card @click="goToProductDetail(index)" v-for="(product, index) in products" :key="product.id"
                    width="25%" class="mt-5 mx-2 elevation-3"
                    style="display:inline-block; overflow:hidden; white-space: nowrap; text-overflow: ellipsis;">
                    <v-img size="10px" :src="product.imageUrl"></v-img>
                    <v-card-title class="pa-0" style=" font-size:10px; font-family:source_sans_proregular;">
                        {{ product.name }}</v-card-title>
                    <v-divider></v-divider>
                    <v-card-subtitle align="center" class="pa-2" style="font-size:50%"><strong>{{product.price}} TL
                            ({{product.platformName}})</strong></v-card-subtitle>
                </v-card>
            </v-flex>
        </v-layout>
        <div align="center">
            <a href="#top" style="text-decoration:none;">
                <v-icon @click="back()" style="cursor:pointer;">arrow_back_ios</v-icon>
            </a>
            <span>Sayfa {{page}} </span>
            <a href="#top" style="text-decoration:none;">
                <v-icon @click="next()" style="cursor:pointer;">arrow_forward_ios</v-icon>
            </a>

        </div>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        totalPage: null,
        page:null,
        products:[]
        }),
    mounted(){
        this.getProduct()
    },
    methods:{
        async getProduct() {
            const response = await this.axios.get("product?size=24&page=" + this.page)
            this.totalPage = response.data.page.totalPages
            this.page = response.data.page.number
            this.products = response.data._embedded.products
            console.log(response)
        },
        goToProductDetail(index) {
            this.$router.push({ path: "/ProductDetailMobile", query: { productId: this.products[index].id } })
        },
        back() {
            if (this.page > 1) {
                this.page -= 1
                this.getProduct()
            }
        },
        next() {
            if (this.page < this.totalPage) {
                this.page += 1
                this.getProduct()
            }
        },
    }
};
</script>