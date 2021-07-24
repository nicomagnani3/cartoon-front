<template>
  <div>
    <div v-if="loading" class="text-center">
      <br /><br /><br />
      <img
        class="logo"
        src="@/assets/logoRojo.png"
        alt=""
        height="auto"
      /><br /><br />
      <small>Estás a un paso de pedir tus stickers</small>
    </div>
    <div v-else>
      <br />
    <!--   <div style="position: fixed; right: 2%; margin: 33px 6px 6px 5px">
        <div class="notify-badge">{{ this.productosSeleccionados.length    }}</div>
        <a variant="white" @click="verMiCarrito()" style="cursor: pointer"
          ><img
            style="float: right; max-width: 40px"
            src="@/assets/carrito.png"
        /></a>
      </div> -->
      <div class="body">
        <b-carousel
          id="carousel-1"
          :interval="5000"
          controls
          indicators
          background="#ababab"
          img-width="1024"
        >
          <div>
            <b-carousel-slide
              img-src="https://res.cloudinary.com/cartoon-tag/image/upload/v1626989129/Slider/1_x9yfey.png"
              class="item"
              alt="image slot"
            ></b-carousel-slide>
            <b-carousel-slide
              img-src="https://res.cloudinary.com/cartoon-tag/image/upload/v1626989127/Slider/2_aacbxt.png"
              class="item"
              alt="image slot"
            ></b-carousel-slide>
            <b-carousel-slide
              img-src="https://res.cloudinary.com/cartoon-tag/image/upload/v1626989127/Slider/3_vfcuhe.png"
              class="item"
              alt="image slot"
            ></b-carousel-slide>
          </div>
        </b-carousel>
      </div>
      <br />
      <div aria-label="breadcrumb">
        <ol class="breadcrumb" style="background: #9d2d27">
          <li>
            <h4 style="color: #ffffff">Los mas pedidos</h4>
          </li>
          <li class="ml-auto" aria-current="page">
            <router-link to="/products" style="color: #ffffff"
              >Todos</router-link
            >
          </li>
        </ol>
      </div>
      <Productos
        :bestProducts="this.bestProducts"
    
        :productosSeleccionados="this.productosSeleccionados"
      ></Productos>
      <div aria-label="breadcrumb">
        <ol class="breadcrumb" style="background: #9d2d27">
          <li>
            <h4 style="color: #ffffff">Categorias</h4>
          </li>
          <li class="ml-auto" aria-current="page">
            <router-link to="/products" style="color: #ffffff"
              >Todos</router-link
            >
          </li>
        </ol>
      </div>
      <Categorias  :categorias="this.categiaHome" :productosSeleccionados="this.productosSeleccionados"></Categorias>
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
    </div>
  </div>
</template>


<script>
import Productos from "@/components/Productos/Productos.vue";
import Categorias from "@/components/Categorias/Categorias.vue";
import Carrito from "@/components/Carrito/Carrito.vue";
import axios from "axios";
import ProductosService from "@/services/ProductosService";
import CategoriasService from "@/services/CategoriasService";


export default {
  name: "Home",

  components: { Productos, Categorias, Carrito },
  props: {
   
      productosSeleccionados: {
      type: Array,
    },
  },

  data() {
    return {
      bestProducts: [],
      categorias: [],
      ultimoPedido: [],
      cantidadProductos: 0,
      miPedido: [],
      loading: true,
      categiaHome:[],
    };
  },
  mounted() {
    axios
      .all([this.getProductos(),this.getCategorias()])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  created() {},
  methods: {
    async getProductos() {
      try {
        const response = await ProductosService.getProductos();
        this.bestProducts = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async getCategorias() {
      try {
        const response = await CategoriasService.getCategorias();
        this.categorias = response.data;
       
        this.categorias.forEach(categoria => {
          if (categoria.imagenURL != null)
            this.categiaHome.push( categoria)
     
        });
      } catch (err) {
        console.log(err);
      }
    },
  
    verMiCarrito() {
       this.$refs["modalCarrito"].show();
      console.log(this.productosSeleccionados   ); 
    },
    okDetalles() {
      this.$refs["modalCarrito"].hide();
    },
  },
};
</script>


<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500&display=swap");

.body {
  background-color: #f3f2f2;
  height: auto;
  font-family: "Roboto";
}
small,
p,
h4,
span {
  font-family: "Roboto";
}
.notify-badge {
  position: relative;
  background: #ffffff;
  height: 2rem;
  top: 1rem;
  left: 1.5rem;
  width: 3rem;
  text-align: center;
  line-height: 2rem;
  font-size: 1rem;
  border-radius: 50%;
  color: #000000;
  border: 1px solid #ffffff;
}

.logo {
  -webkit-animation: tiembla 2.1s infinite;
  text-align: center;
  max-width: 140px;
  font-family: "Roboto";
}
@-webkit-keyframes tiembla {
  0% {
    -webkit-transform: rotateZ(0deg);
  }
  50% {
    -webkit-transform: rotateZ(0deg) scale(0.7);
  }
  100% {
    -webkit-transform: rotateZ(0deg);
  }
}
</style>