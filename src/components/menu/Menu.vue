<template>
  <b-container class="nav" fluid>
    <b-navbar
      id="f-navbar"
      v-bind:class="[isSticky ? stickyClass : '']"
      toggleable="lg"
      type="light"
    >
      <b-navbar-brand :to="'/'"><Header /> </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse class="navbar-collapse" id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item class="items">
            <span class="items">Stock</span></b-nav-item
          >
          <b-nav-item-dropdown>
            <template slot="button-content">
              <span class="items">Categorias</span>
            </template>

            <b-dropdown-item
              v-for="categoria in categorias"
              :key="categoria.value"
              :value="categoria.value"
                 @click="verProductos(categoria)"
              >{{ categoria.categoria }}</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form right>
            <div >
              <div class="notify-badge">
                <p>{{ this.calcularCantidad() }}</p>
              </div>
              <a variant="white" @click="verMiCarrito()" style="cursor: pointer"
                ><img
                  style="float: right; max-width: 40px"
                  src="@/assets/carro.png"
              /></a>
            </div>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
     <div class="modalCarrito">
        <b-modal
          title="Mi pedido"
          class="modalCarrito"
          centered
          ref="modalCarrito"
          hide-footer
          body-bg-variant="light"
          footer-bg-variant="light"
          header-bg-variant="light"
        >
          <Carrito @okDetalles="okDetalles" :miPedido="this.productosSeleccionados"></Carrito>
        </b-modal>
      </div>
  </b-container>
</template>
<script>
import Header from "@/components/menu/Header.vue";
import axios from "axios";
import CategoriasService from "@/services/CategoriasService";
import Carrito from "@/components/Carrito/Carrito.vue";

export default {
  name: "Index",
  props: {
    productosSeleccionados: {
      type: Array,
    },
  },
  components: {
    Header,Carrito
  },

  data() {
    return {
      categorias: [],
      loading: false,
      isSticky: false,
      stickyClass: "is_sticky",
      scrollPosition: 0,
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
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
    handleScroll() {
      this.scrollPosition = window.scrollY;
      if (this.scrollPosition >= 100) {
        this.isSticky = true;
      } else {
        this.isSticky = false;
      }
    },
    verMiCarrito() {
      this.$refs["modalCarrito"].show();
      console.log(this.productosSeleccionados);
    },
     okDetalles() {
      this.$refs["modalCarrito"].hide();
    },
    calcularCantidad() {
      let cantidad = 0;
      this.productosSeleccionados.forEach((pedido) => {
        cantidad = Number(cantidad) + Number(pedido.cantidad);
      });
      return cantidad;
    },
    async getCategorias() {
      try {
        const response = await CategoriasService.getCategorias();
        this.categorias = response.data;

        this.categorias = this.ordenarDatos(this.categorias);
      } catch (err) {
        console.log(err);
      }
    },
    ordenarDatos(categoria) {
      return categoria.sort(function (a, b) {
        if (a.categoria > b.categoria) {
          return 1;
        }
        if (a.categoria < b.categoria) {
          return -1;
        }
        return 0;
      });
    },
     verProductos(categoria){
      console.log(categoria.productos)
       this.$router.push({
          name: "productosCategoria",
          query: {
          q: this.searchQuery,
          t: new Date().getTime(),
        },
          params: {
            bestProducts: categoria.productos,
            productosSeleccionados: this.productosSeleccionados
          },
        });
    }
  },
};
</script>

<style>
.nav {
  background-color: #9d2d27;
  display: flex;
  flex-direction: column;
}
.items {
  font-family: "Roboto";
  color: #ffffff;
}
.navbar.is_sticky {
  background-color: #9d2d27;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
  width: 100%;
  -webkit-animation: 0.95s ease-in-out 0s normal none 1 running fadeInDown;
  animation: 0.95s ease-in-out 0s normal none 1 running fadeInDown;
  -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.1);
}
</style>