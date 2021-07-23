<template>
 <div class="best-products">
    <div class="row">
      <card-loader :loopCount="6" v-if="loading"/>
      <div class="col-md-2" v-for="(item, index) in bestProducts" :key="index">
        <card-template :item="item"/>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import ProductosService from "@/services/ProductosService";
import CardLoader from "@/components/Productos/CardLoader";
import CardTemplate from "@/components/Productos/CardTemplate";
export default {
  name: "Home",

components: { CardLoader, CardTemplate, },
    data() {
    return {
      loading: true,
    bestProducts:[],
    };
  },
   mounted() {
    axios
      .all([this.getProductos()])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods:{
        async getProductos() {
      try {
        const response = await ProductosService.getProductos();
       
          this.bestProducts = response.data;
        
      } catch (err) {
            console.log(err)
      }
    },
  }
};

</script>


<style>
.body {
  background-color: #ebebeb;
  height: auto;
}
.best-products {
  margin-bottom: 10px;
}
</style>