<template>
  <transition-group class="projects" name="projects">
    <div class="project" v-bind:key="item.nombre" v-for="item in bestProducts">
        <card-template :item="item" :productosSeleccionados="productosSeleccionados"  @seleccionoProducto="seleccionoProducto" />
      <br />
    </div>
  </transition-group>
</template>


<script>

import CardTemplate from "@/components/Productos/CardTemplate"; 
export default {
  name: "Home",
  props: {
    bestProducts: {
      type: Array,
    },
      productosSeleccionados: {
      type: Array,
    },
  },

    components: {  CardTemplate }, 
  data() {
    return {
      loading: true,
   
    };
  },
  mounted() {},
  methods: {
    seleccionoProducto() {
      this.$emit("seleccionoProducto");
    },
  }
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
  border-radius: 3px;
  width: 180px;

  flex-direction: column;
  align-items: center;
}

.project-image-wrapper {
  position: relative;
  background: #9d2d27;
 
}



.project-image {
       max-width: 183px;
           border: 10px solid transparent;
  display: block;
  margin: auto;
  height: 150px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
</style>