<template>
  <div>
    <br />
    <div class="body">
      <b-carousel
        id="carousel-fade"
        :interval="5000"
        fade
        indicators
        background="#ababab"
        img-width="1024"
      >
        <div>
          <b-carousel-slide
            img-src="https://res.cloudinary.com/cartoon-tag/image/upload/v1707316108/Slider/PRECIOS/1_rv9nak.jpg"
            class="item"
            alt="image slot 1"
          ></b-carousel-slide>
          <b-carousel-slide
            img-src="https://res.cloudinary.com/cartoon-tag/image/upload/v1707316106/Slider/PRECIOS/2_hwtrck.jpg"
            class="item"
            alt="image slot 2"
          ></b-carousel-slide>
          <b-carousel-slide
            img-src="https://res.cloudinary.com/cartoon-tag/image/upload/v1707316105/Slider/PRECIOS/4_wc2naw.jpg"
            class="item"
            alt="image slot 3"
          ></b-carousel-slide>
          <b-carousel-slide
            img-src="https://res.cloudinary.com/cartoon-tag/image/upload/v1707316106/Slider/PRECIOS/5_ark9pz.jpg"
            class="item"
            alt="image slot 4"
          ></b-carousel-slide>
<!--           <b-carousel-slide
            img-src="https://res.cloudinary.com/cartoon-tag/image/upload/v1658190464/Slider/EMPRENDEDORES_t5yskd.jpg"
            class="item"
            alt="image slot 5"
          ></b-carousel-slide>
             <b-carousel-slide
            img-src="https://res.cloudinary.com/cartoon-tag/image/upload/v1658190464/Slider/EMPRENDEDORES_1_tpsco9.jpg"
            class="item"
            alt="image slot 6"
          ></b-carousel-slide>
             <b-carousel-slide
            img-src="https://res.cloudinary.com/cartoon-tag/image/upload/v1658190464/Slider/EMPRENDEDORES_2_qium8z.jpg"
            class="item"
            alt="image slot 7"
          ></b-carousel-slide>
             <b-carousel-slide
            img-src="https://res.cloudinary.com/cartoon-tag/image/upload/v1658190465/Slider/EMPRENDEDORES_3_tn73az.jpg"
            class="item"
            alt="image slot 8"
          ></b-carousel-slide> -->
        </div>
      </b-carousel>
    </div>
    <br />
    <div aria-label="breadcrumb">
      <ol class="breadcrumb" style="background: #9d2d27">
        <li>
          <h4 style="color: #ffffff">Categorias destacadas</h4>
        </li>
      </ol>
    </div>
    <Categorias
      :categorias="this.categiaHome"
      :productosSeleccionados="this.productosSeleccionados"
    ></Categorias>
    <div aria-label="breadcrumb">
      <ol class="breadcrumb" style="background: #9d2d27">
        <li>
          <h4 style="color: #ffffff">Modelos destacados</h4>
        </li>
        <!-- <li class="ml-auto" aria-current="page">
            <router-link to="/products" style="color: #ffffff"
              >Todos</router-link
            >
          </li> -->
      </ol>
    </div>
    <Productos
      :bestProducts="this.bestProducts"
      :productosSeleccionados="this.productosSeleccionados"
    ></Productos>
  </div>
</template>


<script>
import Productos from "@/components/Productos/Productos.vue";
import Categorias from "@/components/Categorias/Categorias.vue";

export default {
  name: "Home",

  components: { Productos, Categorias },
  props: {
    productosSeleccionados: {
      type: Array,
    },
    bestProducts: {
      type: Array,
    },   
    categiaHome: {
      type: Array,
    },
  },

  data() {
    return {};
  },
  mounted() {},
  created() {},
  methods: {},
};
</script>


<style>
@media only screen and (max-width: 480px) {
  .breadcrumb {
    padding: 0rem 0rem !important;
    margin-bottom: 1rem !important;
    list-style: none !important;
    background-color: #e9ecef;
    display: flex;
  justify-content: center;
  }
  h4 {
    font-size: 1rem !important;
    font-family: "Roboto";
    padding: 2px;
}
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