<template>
  <b-container class="nav" fluid>
    <b-navbar
      id="f-navbar"
      v-bind:class="[isSticky ? stickyClass : '']"
      type="light"
      toggleable="lg"
    >
      <b-navbar-brand style="cursor: pointer" @click="home()"
        ><Header />
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse  id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown class="categorias">
            <template slot="button-content">
              <span class="items">Dibujos animados</span>
            </template>

            <b-dropdown-item
              v-for="(categoria, index) in categoria1"
              :key="index"
              :value="categoria.value"
              @click="verProductos(categoria)"
              >{{ categoria.categoria }}</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item-dropdown class="categorias">
            <template slot="button-content">
              <span class="items">Deportes</span>
            </template>

            <b-dropdown-item
              v-for="(categoria, index) in categoria2"
              :key="index"
              :value="categoria.value"
              @click="verProductos(categoria)"
              >{{ categoria.categoria }}</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item-dropdown class="categorias">
            <template slot="button-content">
              <span class="items">Series y Peliculas</span>
            </template>

            <b-dropdown-item
              v-for="(categoria, index) in categoria3"
              :key="index"
              :value="categoria.value"
              @click="verProductos(categoria)"
              >{{ categoria.categoria }}</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item-dropdown class="categorias">
            <template slot="button-content">
              <span class="items">Naturaleza</span>
            </template>

            <b-dropdown-item
              v-for="(categoria, index) in categoria4"
              :key="index"
              :value="categoria.value"
              @click="verProductos(categoria)"
              >{{ categoria.categoria }}</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item-dropdown class="categorias">
            <template slot="button-content">
              <span class="items">Más Categorías</span>
            </template>

            <b-dropdown-item
              v-for="(categoria, index) in categoria5"
              :key="index"
              :value="categoria.value"
              @click="verProductos(categoria)"
              >{{ categoria.categoria }}</b-dropdown-item
            >
          </b-nav-item-dropdown>
            <!--  <b-nav-item class="categorias">
              <span class="items" @click="verTodos()">Todos</span>           
          </b-nav-item> -->
        </b-navbar-nav>
      </b-collapse>
      <b-navbar-brand>
        <div style="float: right">
          <li class="nav-item">
            <div>
              <div class="notify-badge">
                <p>{{ this.calcularCantidad() }}</p>
              </div>
              <a variant="white" @click="verMiCarrito()" style="cursor: pointer"
                ><img style="max-width: 40px" src="@/assets/carro.png" alt="logo carrito"
              /></a>
            </div>
          </li>
        </div>
      </b-navbar-brand>
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
        <Carrito
          @okDetalles="okDetalles"
          :miPedido="this.productosSeleccionados"
        ></Carrito>
      </b-modal>
    </div>
  </b-container>
</template>
<script>
import Header from "@/components/menu/Header.vue";
import Carrito from "@/components/Carrito/Carrito.vue";

export default {
  name: "Index",
  props: {
    productosSeleccionados: {
      type: Array,
    },
    categorias: {
      type: Array,
    },
    categoria1: {
      type: Array,
    },
    categoria2: {
      type: Array,
    },
    categoria3: {
      type: Array,
    },
    categoria4: {
      type: Array,
    },
    categoria5: {
      type: Array,
    },
     todasCategorias: {
      type: Array,
    },
  },
  components: {
    Header,
    Carrito,
  },

  data() {
    return {
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
  mounted() {},
  methods: {
    home() {
      window.scrollTo(0, 0);
      this.$router.push({
        path: "/",
        query: {
          q: this.searchQuery,
          t: new Date().getTime(),
        },
      });
    },
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

    ordenarProductos(productos) {
      productos.sort(function (a, b) {
        if (a.numero > b.numero) {
          return 1;
        }
        if (a.numero < b.numero) {
          return -1;
        }
        return 0;
      });
      return productos;
    },
    verTodos(){
      let productos=[]
      this.todasCategorias.forEach(categoria => {
        categoria.productos.forEach(producto => {
           productos.push(producto)
        });
      });
        window.scrollTo(0, 0);
      this.$router.push({
        name: "stickers",
        query: {
          q: this.searchQuery,
          t: new Date().getTime(),
        },
        params: {
          bestProducts: productos,
          nombreCategoria: this.todasCategorias.categoria,
          productosSeleccionados: this.productosSeleccionados,
        },
      });
    },
    verProductos(categoria) {
      window.scrollTo(0, 0);
      this.$router.push({
        name: "stickers",
        query: {
          q: this.searchQuery,
          t: new Date().getTime(),
        },
        params: {
          bestProducts: this.ordenarProductos(categoria.productos),
          nombreCategoria: categoria.categoria,
          productosSeleccionados: this.productosSeleccionados,
        },
      });
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
.items {
  font-family: "Roboto";
  color: #ffffff;
}
.navbar.is_sticky {
  background-color: #9d2d27;
  position: fixed;
  z-index: 999;
  width: 99%;
}
.categorias .dropdown-menu {
  max-height: 70vh;
  overflow-y: auto;
}
</style>