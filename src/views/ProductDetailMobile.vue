<template>
    <v-row class="mt-5 mx-2 elevation-3" width="100%" align="center">
        <v-col width="50%">
            <v-card max-width="35%" class="elevation-3"
                style=" display:inline-block; overflow:hidden; white-space: nowrap; text-overflow: ellipsis;">
                <v-img :src="product.imageUrl"></v-img>
                <v-card-title class="pa-0" style=" font-size:10px; font-family:source_sans_proregular;">
                    {{product.name}}
                </v-card-title>
                <v-divider class="mx-4"></v-divider>
                <v-card-subtitle align="center" class="pa-2" style="; font-size:50%"><strong> {{product.price}} TL ({{product.platformName}})</strong></v-card-subtitle>
            </v-card>
            <div class="ml-5" style="display:inline-block;">
                <v-btn class="pa-2" v-for="productOther in products" :key="productOther.id" :href="productOther.url" style="display:block;;">{{productOther.platformName}}:<span>{{productOther.price}} TL</span></v-btn>
            </div>
        </v-col>
        <v-col width="50%">
            <table>
                <tr>
                    <th style="border-bottom:1px solid grey" class="text-left">Teknik Özellikler:</th>
                </tr>
                <tr v-for="(productDetail) in Object.entries(this.product.detail)" :key="productDetail.id">
                    <th class="text-left" style="font-size: 90%; width: 60%">{{productDetail[0]}}</th>
                    <th class="text-left" style="width: 3%">:</th>
                    <td style="width: 37%; font-size: 80%;" colspan="2">{{productDetail[1]}}</td>
                </tr>
            </table>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data: () => ({
        products: [],
        searchName:"",
        product:{},
    }),
    methods:{
        async getProduct(){
            const response = await this.axios.get("http://localhost:8080/product/search/getProduct?id=" + this.$route.query.productId)
            this.product = response.data._embedded.products[0]

            this.searchName = this.product.name.substring(0, this.product.name.indexOf('('))
            const response2 = await this.axios.get("http://localhost:8080/product/search/findCheapestProduct?name=" + this.searchName);
            this.products = response2.data._embedded.products
        }
    },
    mounted(){
        this.getProduct()
    }
}
</script>