<template>
    <v-container>
        <v-layout>
            <v-flex class="xs12 sm12 md12 lg12 ml-7">
                <v-card @click="goToProductDetail(index)" v-for="(product,index) in products" :key="product.id"  width="25%" class="mt-5 mx-2 elevation-3" style="display:inline-block; overflow:hidden; white-space: nowrap; text-overflow: ellipsis;" >
                    <v-img size="10px" :src="product.imageUrl"></v-img>
                    <v-card-title class="pa-0" style=" font-size:10px; font-family:source_sans_proregular;">{{product.name}}</v-card-title>
                    <v-divider></v-divider>
                    <v-card-subtitle align="center" class="pa-1" style="font-size:50%"><strong>{{product.price}} TL ({{product.platformName}})</strong></v-card-subtitle>
                </v-card>
            </v-flex>
            </v-layout>
    </v-container>
</template>

<script>

export default {
    data: () => ({
        products:[]
    }),
    methods:{
        async getProduct() {
            const response = await this.axios.get("product/search/findCheapestProduct?name=" + this.$route.query.searchName)
            this.products = response.data._embedded.products
            this.products = JSON.parse(JSON.stringify(this.products))
            
        },
        goToProductDetail(index){
            this.main=false
            this.$router.push({path: "/ProductDetailMobile", query:{productId: this.products[index].id, main:false}})
    },
    },
    mounted() {
        this.getProduct()
    }
    
}
</script>

<style>

</style>