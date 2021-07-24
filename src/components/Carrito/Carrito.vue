<template >
  <div>
    <div v-for="(pedido, index) in miPedido" :key="index" class="container">
      <b-row>
        <div   style="background: #9d2d27">
          <div class="notify-cantidad">{{ pedido.cantidad }}</div>
          <img
         
            :src="pedido.imagen"
            alt="Card image cap"
            class="imagenLeft"
        /></div>
        <b-col class="textoPedido">
          <small>
            {{ pedido.nombre }} - {{ pedido.tamaño }}</small
          >
          <small>
            ${{calcularPrecio(pedido.tamaño)}}</small
          >
          </b-col
        >

        <b-col col lg="1">
          <b-button variant="danger" style="float: right" @click="borrarPedido(index)">X</b-button></b-col
        >
      </b-row>
    </div>
    <div>
      <div style="text-align: right">
        <br />
        <div>
          <small v-if="calcularCantidad() < 5" style="color: red"
            >Debe elegir como minimo 5 stickers</small
          >
        </div>
        <div>
        <small style="float:left"> Cantidad: {{ calcularCantidad() }} </small>
        <small><b> Total: ${{ calcularTotal() }} </b></small></div>
      </div>
      <b-button
        class="mt-2"
        variant="success"
        block
        :disabled="calcularCantidad() < 5"
        :href="
          'https://mail.google.com/mail/?view=cm&fs=1&to=cartoon.tag@hotmail.com' +
          '&body=Hola!%20,queria%20pedir%20' +
          this.armarPedidoTexto() +
          '&su=Pedido stickers'
        "
        target="_black"
        >Confirmar pedido</b-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Carrito",
  components: {},
  props: {
    miPedido: {
      type: Array,
    },
  },
  data() {
    return {
      loading: true,
      pedidoOrdenado: [],
      mini: 30,
      regular: 40,
      grande: 70,
      mayor20unidadesMini: 25,
      mayor20unidadesRegular: 35,
      mayor20unidadesGrande: 65,
    };
  },
  created() {},
  methods: {
    aceptarDetalle() {
      this.$emit("okDetalles");
    },
    calcularCantidad() {
      let cantidad = 0;
      this.miPedido.forEach((pedido) => {
        cantidad = Number(cantidad) + Number(pedido.cantidad);
      });
      return cantidad;
    },
    calcularPrecio(tamaño){
      if (this.miPedido.length < 20) {
         if (tamaño == "Mini") {
            return this.mini
          }
          if (tamaño == "Regular") {
            return this.regular
          }
          if (tamaño == "Grande") {
            return this.grande
          }
      }else{
        if (tamaño == "Mini") {
          return this.mayor20unidadesMini
          }
          if (tamaño == "Regular") {
            return this.mayor20unidadesRegular
          }
          if (tamaño == "Grande") {
            return this.mayor20unidadesGrande
          }


      }
    },
    calcularTotal() {
      let total = 0;
      if (this.miPedido.length < 20) {
        this.miPedido.forEach((pedido) => {
          if (pedido.tamaño == "Mini") {
            total = Number(total) + Number(pedido.cantidad) * Number(30);
          }
          if (pedido.tamaño == "Regular") {
            total = Number(total) + Number(pedido.cantidad) * Number(40);
          }
          if (pedido.tamaño == "Grande") {
            total = Number(total) + Number(pedido.cantidad) * Number(70);
          }
        });
      } else {
        this.miPedido.forEach((pedido) => {
          if (pedido.tamaño == "Mini") {
            total = Number(total) + Number(pedido.cantidad) * Number(25);
          }
          if (pedido.tamaño == "Regular") {
            total = Number(total) + Number(pedido.cantidad) * Number(35);
          }
          if (pedido.tamaño == "Grande") {
            total = Number(total) + Number(pedido.cantidad) * Number(65);
          }
        });
      }
      return total;
    },
   
    armarPedidoTexto() {
      let pedidoMail = "";
      this.miPedido.forEach((pedido) => {
        pedidoMail =
          pedidoMail +
          "%0A" +
          pedido.nombre +
          "%20" +
          "Tamaño:" +
          "%20" +
          pedido.tamaño +
          "%20" +
          "Cantidad:" +
          "%20" +
          pedido.cantidad +
          ";";
      });
      return pedidoMail;
    },
    borrarPedido(pedidoBorrar){
      console.log(pedidoBorrar)
this.miPedido.splice(pedidoBorrar,1);
console.log(this.miPedido)
    }
  },
};
</script>

<style>
@media only screen and (max-width: 480px) {
.textoPedido{
     font-size: 10px;
        display: contents;
    align-items: center;
}
.img{
      max-width: 40px;
    border: 0px solid transparent;
    margin: auto;
    height: 73px;
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
.col{
  padding-right:0px;
    padding-left: 0px;
}
}



.izquierda {
  display: inline-block;
  width: 20%;
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
.notify-cantidad {
  position: absolute;
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
.textoPedido{
  text-align: center;
}
.imagenLeft{
 max-width: 65px;
              border: 0px solid transparent;
              margin: auto;
              height: 73px;
              object-fit: contain;
}
</style>