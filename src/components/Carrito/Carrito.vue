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

          <small> {{ pedido.tamaño }}</small>
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
        >    
        </div>
        <div>
          <small style="float: left">
            Cantidad: {{ calcularCantidad() }}
          </small>        
          <small
            ><b > Total: ${{ calcularTotal() }} </b></small
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
      mini: 40,
      regular: 80,
      grande: 140,
      mayor10unidadesMini: 35,
      mayor10unidadesRegular: 70,
      mayor10unidadesGrande: 130,
      mayor20unidadesMini: 30,
      mayor20unidadesRegular: 60,
      mayor20unidadesGrande: 110,
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
       this.miPedido.forEach((pedido) => {
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
           if (cantMini > 9 && cantMini < 20 ){
              return this.mayor10unidadesMini;
            }
            if ( cantMini > 19 ){
              return this.mayor20unidadesMini;
            }            
             return this.mini;
             
        }
        if (tamaño == "Regular") {
           if (cantRegular > 9 && cantRegular < 20){
              return this.mayor10unidadesRegular;
            }
             if ( cantRegular > 19 ){
              return this.mayor20unidadesRegular;
            }        
             return this.regular;
             
        }
        if (tamaño == "Grande") {
           if (cantGrande > 9 && cantGrande < 20  ){
              return this.mayor10unidadesGrande;
            }
             if ( cantGrande > 19 ){
              return this.mayor20unidadesGrande;
            }    
             return this.grande;
            
        }
    },
    calcularTotal() {
      //let cantidadTotal = this.calcularCantidad();
      let total = 0
      let cantMini=0,cantRegular=0,cantGrande=0
      this.miPedido.forEach((pedido) => {
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
       this.miPedido.forEach((pedido) => {
          if (pedido.tamaño == "Mini") {
              if (cantMini > 9 && cantMini < 20 ){
              total = Number(total) + Number(pedido.cantidad) * Number(this.mayor10unidadesMini);
            }
             if ( cantMini > 19 ){
              total = Number(total) + Number(pedido.cantidad) * Number( this.mayor20unidadesMini);
            }  
            if ( cantMini < 10 ){
              total = Number(total) + Number(pedido.cantidad) * Number( this.mini);
            }
          }
          if (pedido.tamaño == "Regular") {
                if (cantRegular > 9 && cantRegular < 20){
              total = Number(total) + Number(pedido.cantidad) * Number(this.mayor10unidadesRegular);
            }
            if ( cantRegular > 19 ){
              total = Number(total) + Number(pedido.cantidad) * Number(this.mayor20unidadesRegular);
            }
             if ( cantRegular < 10 ){
              total = Number(total) + Number(pedido.cantidad) * Number(this.regular);
            }
          }
          if (pedido.tamaño == "Grande") {
            if (cantGrande > 9 && cantGrande < 20  ){
              total = Number(total) + Number(pedido.cantidad) * Number(this.mayor10unidadesGrande);
            }
            if ( cantGrande > 19 ){
              total = Number(total) + Number(pedido.cantidad) * Number(this.mayor20unidadesGrande);
            }
            if ( cantGrande < 10 ){
              total = Number(total) + Number(pedido.cantidad) * Number(this.grande);
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
    border: 10px solid transparent !important;
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
  border: 10px solid transparent;
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