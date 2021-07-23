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
      <div style="position: fixed; right: 2%; margin: 33px 6px 6px 5px">
        <div class="notify-badge">{{ this.cantidadProductos }}</div>
        <a variant="white" @click="verMiCarrito()" style="cursor: pointer"
          ><img
            style="float: right; max-width: 40px"
            src="@/assets/carrito.png"
        /></a>
      </div>
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
        @seleccionoProducto="seleccionoProducto"
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
      <Categorias></Categorias>
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
          <Carrito @okDetalles="okDetalles" :miPedido="this.miPedido"></Carrito>
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
export default {
  name: "Home",

  components: { Productos, Categorias, Carrito },

  data() {
    return {
      bestProducts: [],
      ultimoPedido: [],
      cantidadProductos: 0,
      miPedido: [],
      loading: true,
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
    seleccionoProducto() {
      let pedido = localStorage.getItem("pedido");
      let tamaños = localStorage.getItem("tamaños");
      let cantidad = localStorage.getItem("cantidad");
      if (pedido == null) {
        this.cantidadProductos = 0;
      } else {
        let comprasArray = pedido.split(",");
        let tamañosArray = tamaños.split(",");
        let cantidadArray = cantidad.split(",");
        let seleccionados = [];
     
          for (let index = 0; index < comprasArray.length; index++) {
            for (let prod of this.bestProducts) {
              if (prod.id == comprasArray[index]) {
                seleccionados.push({
                  nombre: prod.nombre,
                  tamaño: tamañosArray[index],
                  id: prod.id,
                  imagen: prod.url,
                  cantidad: cantidadArray[index],
                });
              }
            }
          }
          this.miPedido = seleccionados;
          this.cantidadProductos = seleccionados.length;
        }
      
    },
    yaEstaSeleccionado(ultimoProducto, tamaño,cantidad) {
      this.miPedido.forEach((pedido) => {
        if (pedido.id == ultimoProducto && tamaño == pedido.tamaño) {
          console.log("entra")
          pedido.cantidad= Number(pedido.cantidad) + Number(cantidad)
          return true;
        }
      });
      return false;
    },
  
    verMiCarrito() {
      this.$refs["modalCarrito"].show();
      console.log(this.miPedido);
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