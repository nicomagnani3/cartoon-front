<template>
  <div>
   <!--  <div v-if="loading" class="text-center">
    <br /><br /><br /><br />
      <img
        class="logoVacaciones"
        src="https://res.cloudinary.com/cartoon-tag/image/upload/v1659396321/Slider/vacaciones_agosto_znyxhr.png"
        alt="logo"
        height="auto"
        @click="contador()"
      />

    </div>
    <div v-else>  -->
    <div v-if="loading" class="text-center">
        <br /><br /><br /><br />
      <img
        class="logo"
        src="@/assets/logoRojo.png"
        alt="logo"
        height="auto"
        @click="contador()"
      /><br /><br />
      <small>Estás a un paso de pedir tus stickers</small><br />
      <small v-if="Number(this.tiempo) > Number(5)">
        ¿Sabias que comprando mas de 15 unidades obtenes un gran descuento ?
        <b-icon icon="emoji-sunglasses" /></small
      ><br />
      <small v-if="Number(this.tiempo) > Number(10)">
        Estamos cargando todos los modelos...
        <b-icon icon="emoji-smile-upside-down" /></small
      ><br />

      <small v-if="Number(this.tiempo) > Number(15)">
        Nuestro catálogo es tan amplio que genera demoras  <b-icon
          icon="emoji-wink" /></small
      ><br />
      <small v-if="Number(this.tiempo) > Number(15)" style="color: #9d2d27">
        Te recomendamos recargar la web
        <b-icon icon="emoji-dizzy" animation="spin"
      /></small>
    </div>
    <div v-else>
      <div class="wrapper">
        <Menu
          :productosSeleccionados="this.productosSeleccionados"
          :categorias="this.categorias"
          :categoria1="this.categoria1"
          :categoria2="this.categoria2"
          :categoria3="this.categoria3"
          :categoria4="this.categoria4"
          :categoria5="this.categoria5"
          :todasCategorias="this.todasCategorias"
        />
        <router-view
          class="content"
          :productosSeleccionados="this.productosSeleccionados"
          :bestProducts="this.bestProducts"
          :categiaHome="this.categiaHome"
        />
      </div>
     <!--  <Footer class="footer" /> -->
    </div>
<!--   </div> -->
  </div>
</template>

<script>
import axios from "axios";
import ProductosService from "@/services/ProductosService";
import CategoriasService from "@/services/CategoriasService";
/* import Footer from "@/components/menu/Footer.vue";
 */import Menu from "@/components/menu/Menu.vue";

export default {
  name: "Dashboard",
  components: {
    Menu,
/*     Footer,
 */  },
  data() {
    return {
      productosSeleccionados: [],
      todasCategorias: [],
      bestProducts: [],
      categorias: [],
      loading: true,
      categiaHome: [],
      categoria1: [],
      categoria2: [],
      categoria3: [],
      categoria4: [],
      categoria5: [],
      tiempo: 0,
    };
  },
  computed: {},
  created() {},
  methods: {
    contador() {
      setInterval(() => {
        this.tiempo = Number(this.tiempo) + Number(1);
      }, 1000);
    },
    async getProductos() {
      try {
        const response = await ProductosService.getProductos();       
        this.bestProducts = response.data;
        this.ordenarProductos();
      } catch (err) {
        console.log(err);
      }
    },
    ordenarProductos() {
      this.bestProducts.sort(function (a, b) {
        if (a.updatedAt < b.updatedAt) {
          return 1;
        }
        if (a.updatedAt > b.updatedAt) {
          return -1;
        }
        return 0;
      });
    },

    ordenarDatos(categorias) {
      return categorias.sort(function (a, b) {
        if (a.categoria > b.categoria) {
          return 1;
        }
        if (a.categoria < b.categoria) {
          return -1;
        }
        return 0;
      });
    },
    async getCategorias() {
      try {
        const response = await CategoriasService.getCategorias();
        this.categorias = response.data;
        let categoriasOrdenadas = this.ordenarDatos(this.categorias);
        this.todasCategorias = categoriasOrdenadas;
        categoriasOrdenadas.forEach((categoria) => {
          if (categoria.imagenURL != null) this.categiaHome.push(categoria);
          if (categoria.ubicacion == 1) this.categoria1.push(categoria);
          if (categoria.ubicacion == 2) this.categoria2.push(categoria);
          if (categoria.ubicacion == 3) this.categoria3.push(categoria);
          if (categoria.ubicacion == 4) this.categoria4.push(categoria);
          if (categoria.ubicacion == 5) this.categoria5.push(categoria);
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    axios
      .all([this.contador(), this.getProductos(), this.getCategorias()])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
@media (max-width: 600px) {
  .logo {
    max-width: 90%;
    
  }
   .logoVacaciones {
    max-width: 300px !important;
  }
}
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500&display=swap");
body {
  font-family: "Roboto" !important;
  background-color: #ebebeb !important;
  overflow-x: hidden !important;
  height: auto;
}
html {
  position: relative;
  height: 100%;
  overflow-x: hidden !important;
}
small,
p,
h4,
span,
h3,
a,
strong {
  font-family: "Roboto";
}

.box-shadow {
  border-radius: 15px 15px 15px 15px;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.75);
  min-height: calc(100vh * 0.6);
}

.box-shadow-min {
  border-radius: 15px 15px 15px 15px;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.75);
}

.wrapper {
  min-height: calc(100vh - 60px);
}

.label-padding-sm {
  display: inline-block;
  width: 80px;
}

.label-padding {
  display: inline-block;
  width: 160px;
}

.label-padding-tab {
  display: inline-block;
  width: 250px;
}

.footer {
  margin-top: 10px;
  height: 50px;
  line-height: 50px;
  color: white;
  background-color: #ececec;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.logoVacaciones{
  max-width:600px;
  width: 100%;
   -webkit-animation: tiembla 2.1s infinite;
  text-align: center;
  font-family: "Roboto";
}
</style>

