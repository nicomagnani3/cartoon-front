<template>
<div>
    <b-row class="text-center" cols="2" cols-sm="8" cols-md="8" cols-lg="4">
      <b-col
        v-for="(categoria, index) in currentPageClubs"
        :key="index"
        class="mb-2"
      >
      <div  class="zoom" >
        <img fluid alt="Responsive image" @click="verProductos(categoria)" :src="categoria.imagenURL" /><br>
      </div>
      </b-col>
    </b-row>
</div>
</template>


<script>
export default {
  name: "Home",
  props: {
    categorias: {
      type: Array,
    },
    productosSeleccionados: {
      type: Array,
    },
  },
  components: {},
  data() {
    return {
      paginatedClubs: [],
      nbPages: 0,
      ubicaicon: 0,
      nbRowPerPage: 10,
      currentPageIndex: 0,
      indice: 1,
      productos: [],
      loading: true,
    };
  },
  mounted() {},
  computed: {
    currentPageClubs() {
      this.createPages();

      return this.paginatedClubs[this.currentPageIndex];
    },
  },
  methods: {
    createPages() {
      let lengthAll = Object.keys(this.categorias).length;
      this.nbPages = 0;

      for (let i = 0; i < lengthAll; i = i + this.nbRowPerPage) {
        this.paginatedClubs[this.nbPages] = this.categorias.slice(
          i,
          i + this.nbRowPerPage
        );
        this.nbPages++;
      }
    },
    verProductos(categoria) {
      console.log(categoria.productos);
      this.$router.push({
        name: "productosCategoria",
        params: {
          bestProducts: categoria.productos,
          productosSeleccionados: this.productosSeleccionados,
        },
      });
    },
  },
};
</script>


<style>

.best-products {
  margin-bottom: 10px;
}

.zoom {
    transition: transform .2s; 
}
 
.zoom:hover {
    transform: scale(1.1); 
     cursor: pointer;
}
</style>