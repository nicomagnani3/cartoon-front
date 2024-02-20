<template>
  <div >
    <div class="project-image-wrapper">
      <img class="project-image" :src="item.url"  :alt="'imagen nro'+item.id" />
    </div>
    <div class="cuerpo">
      <div style="text-align: center" class="selectTamaño">
        <div v-if="item.nombre != null && item.nombre != ''">
          <small
            ><strong
              >{{ item.nombre}} - {{ item.numero }}</strong
            ></small
          >
        </div>
        <div v-else-if="item.categorias != null">
          <small
            ><strong>{{ item.categorias[0].categoria }} - {{ item.numero }}</strong></small
          >
        </div>
        <div v-else>
          <small
            ><strong>{{ nombreCategoria }} - {{ item.numero }}</strong></small
          >
        </div>
        <b-form-select
          v-model="selected"
          @change="cambiarCantidad()"
          :options="options"
          size="sm"
          class="mt-3"
          id="selector"
        ></b-form-select>
      </div>
      <br>
      <div style="text-align: center">
<!--         <b-form-group>
              <b-form-radio-group
                  v-model="selectedTipo"
                  :options="optionsTipo"
                  plain
            ></b-form-radio-group>
          </b-form-group> -->
        <b-form-spinbutton
          id="sb-inline"
          size="sm"
          inline
          class="mt-3"
          wrap
          min="0"
          v-model="cantidad"
          max="20"
          placeholder="0"
        ></b-form-spinbutton>
      </div>
      <br>
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
            <img src="@/assets/carrito.png" :alt="'carrito'+item.numero" class="imagnesIcon" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cardTemplate",
  props: ["item", "productosSeleccionados", "nombreCategoria"],
  data() {
    return {
      cantidad: 0,
      selected: "Mini",
      options: [
        { value: null, text: "Tamaño", disabled: true},
        { value: "Mini", text: "Mini" },
        { value: "Regular", text: "Regular" },
  /*       { value: "Grande", text: "Grande" }, deprecated grande */
      ],
      selectedTipo: "blanco",
        optionsTipo: [
          { text: 'Blanco', value: "blanco" },
          { text: 'Holografico', value: "holografico" },
        ]

    };
  },
  components: {},

  methods: {   
    cambiarCantidad() {
      this.cantidad = 1;
    },
    agregarCarrito(item) {
      
      if (this.cantidad > 0) {
        if (!this.yaEstaSeleccionado(item.id, this.selected, this.cantidad,this.selectedTipo)) {
          let categoria = this.verNombreCategoria(item);
          this.productosSeleccionados.push({
            pedido: item.id,
            tamaño: this.selected,
            cantidad: this.cantidad,
            imagen: item.url,
            nombre: item.nombre,
            numero: item.numero,
            categoria: categoria,
            tipo:this.selectedTipo
          });
          this.$emit("seleccionoProducto");
        }
      }
    },
    verNombreCategoria(item) {   
      if (item.nombre != null && item.nombre != '') {
        return item.nombre;
      } else {
        return this.nombreCategoria;
      }
    },
    yaEstaSeleccionado(id, tamaño, cantidad,tipo) {
      let retornan = false;
      this.productosSeleccionados.forEach((pedido) => {        
        if (pedido.pedido == id && pedido.tamaño == tamaño && pedido.tipo == tipo) {
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
.selectTamaño select {
  text-align-last: center !important;
  font-family: "Roboto";
  font-size: 16px;
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
  object-fit: contain;
}

</style>