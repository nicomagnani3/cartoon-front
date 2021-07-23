<template>
  <b-container class="nav" fluid>
    <b-navbar toggleable="lg" type="light" class="">
      <b-navbar-brand :to="'/'"><Header /> </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse class="navbar-collapse" id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item class="items" >  <span class="items"  >Stock</span></b-nav-item>
          <b-nav-item-dropdown>
            <template slot="button-content">
              <span class="items"  >Categorias</span>
            </template>

            <b-dropdown-item
              v-for="categoria in categorias"
              :key="categoria.value"
              :value="categoria.value"
              >{{ categoria.categoria }}</b-dropdown-item
            >
            
          </b-nav-item-dropdown>
          
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

  </b-container>
</template>
<script>
import Header from "@/components/menu/Header.vue";
import axios from "axios";
import CategoriasService from "@/services/CategoriasService";
export default {
  name: "Index",

  components: {
    Header,
  },
  props: {
   
  },
  data() {
    return {
      categorias: [],
      loading: false,
    };
  },

  mounted() {
    axios
      .all([this.getCategorias()])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    async getCategorias() {
      try {
        const response = await CategoriasService.getCategorias();
        this.categorias = response.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
.nav {
  background-color: #9d2d27;
  display: flex;
  flex-direction: column;
}
.items{
    font-family: "Roboto";
    color: #ffffff
}
</style>