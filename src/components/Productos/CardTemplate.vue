<template>
  <div>
    <div class="project-image-wrapper">
      <img class="project-image" :src="item.url" />
      <!--  <div class="gradient-overlay"></div> -->
    </div>
    <div class="cuerpo">
      <div style="text-align: center">
        <small
          ><strong>{{ item.nombre }}</strong></small
        >
        <b-form-select
          v-model="selected"
          @change="cambiarCantidad()"
          :options="options"
          size="sm"
          class="mt-3"
          id="selector"
          style="font-family: 'Roboto'"
        ></b-form-select>
      </div>
      <div style="text-align: center">
        <b-form-spinbutton
          id="sb-inline"
          size="sm"
          inline
          class="mt-3"
          wrap
          min="1"
          v-model="cantidad"
          max="20"
          placeholder="1"
        ></b-form-spinbutton>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <div
          class="d-flex justify-content-center"
          style="margin-left: auto; margin-right: auto"
        >
          <a
            variant="white"
            @click="agregarCarrito(item)"
            style="cursor: pointer"
          >
            <img
              src="@/assets/carrito.png"
              alt=""
              class="imagnesIcon"
            />&nbsp;&nbsp;
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cardTemplate",
  props: ["item", "productosSeleccionados"],
  data() {
    return {
      cantidad: 1,
      selected: "Regular",
      options: [
        { value: null, text: "Tamaño", disabled: true },
        { value: "Mini", text: "Mini" },
        { value: "Regular", text: "Regular" },
        { value: "Grande", text: "Grande" },
      ],
    };
  },
  components: {},

  methods: {
    mostrarImagen(item) {
      return item.url;
    },
    cambiarCantidad() {
      this.cantidad = 1;
    },
    agregarCarrito(item) {
      if (!this.yaEstaSeleccionado(item.id, this.selected, this.cantidad)) {
        this.productosSeleccionados.push({
          pedido: item.id,
          tamaño: this.selected,
          cantidad: this.cantidad,
          imagen: item.url,
          nombre: item.nombre,
        });
        this.$emit("seleccionoProducto");
      }
    },
    yaEstaSeleccionado(id, tamaño, cantidad) {
      let retornan = false;
      this.productosSeleccionados.forEach((pedido) => {
        if (pedido.pedido == id && pedido.tamaño == tamaño) {
          console.log(cantidad);
          pedido.cantidad = Number(pedido.cantidad) + Number(cantidad);
          retornan = true;
        }
      });
      return retornan;
    },
  },
  mounted() {},
};
</script>
<style >
#selector {
  text-align: center;
}
</style>