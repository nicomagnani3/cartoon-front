<template>
  <div>
    <div class="volver">
      <b-button @click="volver()" variant="outline-secondary">
        <b-icon icon="arrow-left-short"></b-icon>Volver
      </b-button>
    </div>
     <div  class="container-fluid">
    <b-row
      class="projects"
      name="projects"
      cols="2"
      cols-sm="8"
      cols-md="8"
      cols-lg="6"
    >
      <b-col v-for="(item, index) in bestProducts" :key="index" class="columnaCards" >
        <div class="project">
         <card-template
          :item="item"
          :productosSeleccionados="productosSeleccionados"
          @seleccionoProducto="seleccionoProducto"
          :nombreCategoria="nombreCategoria"
        />
        <br />
        </div>
      </b-col>
    </b-row>
  </div>
 <!--    <transition-group class="projects" name="projects">
      <div class="project" v-for="(item, index) in bestProducts" :key="index">
        <card-template
          :item="item"
          :productosSeleccionados="productosSeleccionados"
          @seleccionoProducto="seleccionoProducto"
          :nombreCategoria="nombreCategoria"
        />
        <br />
      </div>
    </transition-group> -->
  </div>
</template>


<script>
import CardTemplate from "@/components/Productos/CardTemplate";
export default {
  name: "stickers",
  props: {
    bestProducts: {
      type: Array,
    },
    productosSeleccionados: {
      type: Array,
    },
    nombreCategoria: {
      type: String,
    },
  },

  components: { CardTemplate },
  data() {
    return {};
  },
  mounted() {},
  created() {
    window.scrollTo(0, 0);
  },
  methods: {
    seleccionoProducto() {
      this.$emit("seleccionoProducto");
    },
    volver() {
      this.$router.push("/");
    },
  },
};
</script>


<style>
.best-products {
  margin-bottom: 10px;
}

.imagnesIcon {
  width: 30px;
  margin-left: auto;
  margin-right: auto;
}

.projects {
  margin-bottom: 50px;
  margin-top: 25px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.volver {
  margin-bottom: 50px;
  margin-top: 25px;
  display: flex;
  flex-wrap: wrap;
}

.projects-enter {
  transform: scale(0.5) translatey(-80px);
  opacity: 0;
}

.projects-leave-to {
  transform: translatey(30px);
  opacity: 0;
}

.projects-leave-active {
  position: absolute;
  z-index: -1;
}

.project {
  transition: all 0.35s ease-in-out;
  margin: 10px;
  box-shadow: 0px 2px 8px lightgrey;
  width: 180px;
  border-radius: 13px;
  flex-direction: column;
  align-items: center;
}


</style>