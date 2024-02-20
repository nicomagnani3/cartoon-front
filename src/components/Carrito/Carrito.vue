<template >
  <div>
    <div class="listaPedido">
      <div v-for="(pedido, index) in miPedido" :key="index" class="container">
        <p>
          <!-- <small class="notify-cantidad">{{ pedido.cantidad }}</small> -->
          <img
            style="background: #9d2d27"
            :src="pedido.imagen"
            alt="Card image cap"
            class="imagenLeft"
          />
          <b-button
            variant="danger"
            style="float: right"
            @click="borrarPedido(index)"
            >X</b-button
          >

          <small> {{ pedido.tamaño }} {{ pedido.tipo }}</small>
          <small>
            ${{ calcularPrecio(pedido.tamaño) }} x {{ pedido.cantidad }}</small
          >
          <b-form-spinbutton
            style="margin-left: 4px"
            id="sb-small"
            size="sm"
            inline
            step="1"
            v-model="pedido.cantidad"
          ></b-form-spinbutton>
        </p>
      </div>
    </div>
    <div>
      <div style="text-align: right">
        <div>
          <a
            v-if="calcularCantidad() > 1"
            @click="borrarTodos()"
            class="vaciarCarro"
            >Vaciar carrito <b-icon icon="trash2"
          /></a>
        </div>
        <br />
        <div>
          <small v-if="calcularCantidad() < 5" style="color: red"
            >Debe elegir como minimo 5 stickers</small
          >
        </div>
        <div
          v-if="calcularCantidad() > 5"
          style="width: 50%; text-align: justify"
        ></div>
        <div>
          <small style="float: left">
            Cantidad: {{ calcularCantidad() }}
          </small>
          <small
            ><b> Total: ${{ calcularTotal() | formatPrice }} </b></small
          >
        </div>
      </div>
      <b-button
        class="mt-2"
        variant="success"
        block
        :disabled="calcularCantidad() < 5"
        @click="completarDatosPersonales()"
        >Confirmar pedido</b-button
      >
    </div>
    <div class="modalDatosPersonales">
      <b-modal
        title="Mis datos"
        class="modalCarrito"
        centered
        ref="modalDatosPersonales"
        hide-footer
        body-bg-variant="light"
        footer-bg-variant="light"
        header-bg-variant="light"
      >
        <DatosPersonales
          @okDetallesPersonales="okDetallesPersonales"
          :cantidad="calcularCantidad()"
          :total="calcularTotal()"
          :message="armarPedido()"
        ></DatosPersonales>
      </b-modal>
    </div>
  </div>
</template>

<script>
import DatosPersonales from "@/components/Carrito/DatosPersonales.vue";
export default {
  name: "Carrito",
  components: { DatosPersonales },
  props: {
    miPedido: {
      type: Array,
    },
  },
  data() {
    return {
      cantidad: 1,
      loading: true,
      pedidoOrdenado: [],
      mini: 185,
      regular: 370,

      grande: 140,

      mayor15unidadesMini: 165,
      mayor15unidadesRegular: 330,

      mayor15unidadesGrande: 120,

      mayor30unidadesMini: 130,
      mayor30unidadesRegular: 260,

      mayor30unidadesGrande: 100,
    };
  },
  created() {},
  methods: {
    cambiarCantidad(pedido) {
      pedido.cantidad = Number(pedido.cantidad) + Number(this.cantidad);
    },
    armarPedido() {
      let pedidoMail = "";
      this.miPedido.forEach((pedido) => {
        pedidoMail =
          pedidoMail +
          " " +
          pedido.categoria +
          " " +
          pedido.numero +
          " " +
          "Tamaño:" +
          " " +
          pedido.tamaño +
          " " +
          "Cantidad:" +
          " " +
          pedido.cantidad +
          "\n";
      });

      return pedidoMail;
    },

    calcularCantidad() {
      let cantidad = 0;
      this.miPedido.forEach((pedido) => {
        cantidad = Number(cantidad) + Number(pedido.cantidad);
      });
      return cantidad;
    },
      calcularPrecio(tamaño) {
        let cantMini=0,cantRegular=0,cantGrande=0
        let cantidad=0
       this.miPedido.forEach((pedido) => {
          cantidad = cantidad + pedido.cantidad

        if (pedido.tamaño == "Mini") {
           cantMini= cantMini +pedido.cantidad
          }
          if (pedido.tamaño == "Regular") {
            cantRegular= cantRegular +pedido.cantidad
          }
          if (pedido.tamaño == "Grande") {
            cantGrande = cantGrande + pedido.cantidad
          }
      });  
        if (tamaño == "Mini") {
           if (cantidad > 14  && cantidad < 29 ){
              return this.mayor15unidadesMini;
            }
            if ( cantMini > 29 ){
              return this.mayor30unidadesMini;
            }            
             return this.mini;
             
        }
        if (tamaño == "Regular") {
           if (cantidad >14 && cantidad < 29 ){
              return this.mayor15unidadesRegular;
            }
             if ( cantidad > 29 ){
              return this.mayor30unidadesMini;
            }        
             return this.regular;
             
        }
        if (tamaño == "Grande") {
            if (cantidad >14 && cantidad < 50 ){
              return this.mayor15unidadesGrande;
            }
             if ( cantidad > 29 ){
              return this.mayor30unidadesGrande;
            }    
             return this.grande;
            
        }
    },
    calcularTotal() {
      let cantidadTotal = this.calcularCantidad();
      let total = 0; 
      this.miPedido.forEach((pedido) => {
        if (pedido.tamaño == "Mini") {
          if (cantidadTotal > 14 && cantidadTotal < 50) {
            total =
              Number(total) +
              Number(pedido.cantidad) * Number(this.mayor15unidadesMini);
          }
          if (cantidadTotal > 29) {
            total =
              Number(total) +
              Number(pedido.cantidad) * Number(this.mayor30unidadesMini);
          }
          if (cantidadTotal <= 14) {
            total = Number(total) + Number(pedido.cantidad) * Number(this.mini);
          }
        }
        if (pedido.tamaño == "Regular") {
          if (cantidadTotal > 14   && cantidadTotal < 50) {
            total =
              Number(total) +
              Number(pedido.cantidad) * Number(this.mayor15unidadesRegular);
          }
          if (cantidadTotal > 29) {
            total =
              Number(total) +
              Number(pedido.cantidad) * Number(this.mayor30unidadesMini);
          }
          if (cantidadTotal <= 14) {
            total =
              Number(total) + Number(pedido.cantidad) * Number(this.regular);
          }
        }
        if (pedido.tamaño == "Grande") {
            if (cantidadTotal > 14  && cantidadTotal < 50 ) {
            total =
              Number(total) +
              Number(pedido.cantidad) * Number(this.mayor15unidadesGrande);
          }
          if (cantidadTotal > 29) {
            total =
              Number(total) +
              Number(pedido.cantidad) * Number(this.mayor30unidadesGrande);
          }
          if (cantidadTotal <= 14) {
            total =
              Number(total) + Number(pedido.cantidad) * Number(this.grande);
          }
        }
      });

      return total;
    },

    borrarPedido(pedidoBorrar) {
      this.miPedido.splice(pedidoBorrar, 1);
    },
    borrarTodos() {
      this.miPedido.splice(0, this.miPedido.length);
    },
    completarDatosPersonales() {
      this.$refs["modalDatosPersonales"].show();
    },
    okDetallesPersonales() {
      this.$refs["modalDatosPersonales"].hide();
      this.$emit("okDetalles");
    },
  },
};
</script>

<style>
@media only screen and (max-width: 480px) {
  .textoPedido {
    font-size: 10px;
    display: contents;
    align-items: center;
  }
  .img {
    max-width: 40px;
    border: 0px solid transparent;
    margin: auto;
    height: 63px;
    object-fit: contain;
  }
  .notify-cantidad {
    position: absolute;
    left: 64px;
    background-color: #f1f8e9;
    padding: 0 6px;
    border-radius: 4px;
    border: 3px solid #8bc34a;
    font-weight: 700;
    color: #558b2e;
    font-size: 10px;
    z-index: 1;
  }
  .imagenLeft {
    margin: auto;
    height: 63px !important;
    object-fit: contain;
    max-width: 55px !important;
    border: 5px solid transparent !important;
  }
}

.izquierda {
  display: inline-block;

  height: auto;
}
.derecha {
  display: inline-block;

  height: auto;
  text-align: center;
}
.container {
  padding: 2px;
  border: #d0d0d0 1px solid;
  border-radius: 9px;
}
.listaPedido {
  max-height: 40vh;
  overflow-y: auto;
}
.notify-cantidad {
  left: 70px;
  background-color: #f1f8e9;
  padding: 0 6px;
  border-radius: 4px;
  border: 3px solid #8bc34a;
  font-weight: 700;
  color: #558b2e;
  font-size: 12px;
  z-index: 1;
}
.textoPedido {
  text-align: center;
}
.imagenLeft {
  border: 5px solid transparent;
  margin: auto;
  height: 73px;
  object-fit: contain;
  max-width: 74px;
}
.vaciarCarro {
  color: rgb(157, 45, 39);
  font-size: 12px;
  cursor: pointer;
}
</style>