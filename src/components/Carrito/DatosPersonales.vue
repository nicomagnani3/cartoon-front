<template>
  <div>
    <form ref="form" @submit.prevent="sendEmail">
     <!--  <legend>Forma de entrega</legend>
      <label>
        <input
          type="radio"
          @change="tipoDeEnvio(1)"
          checked="checked"
          name="entrega"
          value="Retiro en La Plata (Gratis)"
        />
        Retiro en La Plata (Gratis) </label
      ><br /> -->
      <label>
        <input
          type="radio"
          @change="tipoDeEnvio(2)"
          name="entrega"
          checked="checked"
          value="Retiro en Comodoro Rivadavia"
        />
        Retiro en Comodoro Rivadavia</label
      ><br />
   <!--    <label>
        <input
          type="radio"
          @change="tipoDeEnvio(3)"
          name="entrega"
          value="Envio a domicilio (El costo depende de la zona)"
        />
        Envio a domicilio (El costo depende de la zona)
      </label> -->
      <b-form-group
        label="Nombre y apellido"
        label-for="persona-input"
        invalid-feedback="Ingrese su nombre y apellido"
        :state="nombreState"
      >
        <b-form-input
          name="nombre"
          class="nombre"
          id="name-input"
          v-model="nombre"
          :state="nombreState"
          required
          size="lg"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Email"
        label-for="persona-input"
        invalid-feedback="Ingrese su email"
        :state="emailState"
      >
        <b-form-input
          type="email"
          name="email"
          class="nombre"
          id="email-input"
          v-model="email"
          :state="emailState"
          required
          size="lg"
        ></b-form-input>
        <p>
          Nos comunicaremos por este medio<br />
          <strong
            >por favor revisa tu correo no deseado <b-icon icon="emoji-smile" />
          </strong>
        </p>
      </b-form-group>
      <input
        type="hidden"
        v-model="cantidad"
        name="cantidad"
        placeholder="Your cantidad"
      />
      <input
        type="hidden"
        v-model="total"
        name="total"
        placeholder="Your total"
      />
      <input type="hidden" v-model="message" name="message" />
      <div v-if="this.tipoEnvio == 3">
        <b-form-group
          label="Direccion (calle y numeracion)"
          label-for="direccion-input"
          invalid-feedback="Ingrese su direccion"
          :state="direccionState"
        >
          <b-form-input
            :required="this.requerido"
            name="direccion"
            class="direccion"
            id="name-input"
            v-model="direccion"
            :state="direccionState"
            size="lg"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Localidad"
          label-for="Localidad-input"
          invalid-feedback="Ingrese su localidad"
          :state="direccionState"
        >
          <b-form-input
            :required="this.requerido"
            name="localidad"
            class="Localidad"
            id="Localidad-input"
            v-model="localidad"
            :state="localidadState"
            size="lg"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Codigo postal"
          label-for="cp-input"
          invalid-feedback="Ingrese su codigo postal"
          :state="cpState"
        >
          <b-form-input
            :required="this.requerido"
            class="nombre"
            name="codgoPostal"
            type="number"
            id="cp-input"
            v-model="codgoPostal"
            :state="cpState"
            size="lg"
          ></b-form-input>
        </b-form-group>
      </div>

      <div>
        <div style="text-align: right">
          <br />
          <div>
            <small style="float: left"> Cantidad: {{ cantidad }} </small>
            <small
              ><b> Total: ${{ total | formatPrice}} </b></small
            >
          </div>
        </div>
      </div>
      <b-button class="mt-2" variant="success" block type="submit"
        >Enviar pedido</b-button
      >
    </form>
  </div>
</template>

<script>
import emailjs from "emailjs-com";

export default {
  props: {
    cantidad: {
      type: Number,
    },
    total: {
      type: Number,
    },
    message: {
      type: String,
    },
  },
  data() {
    return {
      requerido: false,
      alerts: [],
      textoMail: "",
      email: "",
      emailState: "",
      nombre: "",
      entrega: "Retiro en La Plata (Gratis)",
      nombreState: null,
      cpState: null,
      codgoPostal: null,
      direccion: null,
      localidad: null,
      localidadState: null,
      direccionState: null,
      indeterminate: false,
      tipoEnvio: 1,
      options: [
        {
          text: "Retiro en La Plata (Gratis)",
          value: "Retiro en La Plata",
        },
        {
          text: "Retiro en Comodoro Rivadavia (+$250)",
          value: "Retiro en Comodoro Rivadavia ($250)",
        },
        {
          text: "Envio a domicilio (El costo depende de la zona)",
          value: "Envio a domicilio",
        },
      ],
    };
  },

  mounted() {},

  methods: {
    tipoDeEnvio(valor) {
      this.tipoEnvio = valor;
      if (valor == 3) {
        this.requerido = true;
      } else {
        this.requerido = false;
        this.direccion = null;
        this.localidad = null;
        this.codgoPostal = null;
      }
    },
    sendEmail(e) { 
       try {      
         emailjs.sendForm(
          "service_gbpfzjq",
          "template_ey47w2r",
          e.target,
          "user_Smh5UFPGrmjUvQpjaxCAJ",
          {
            nombre: this.nombre,
            email: this.email,
            entrega: this.entrega,
            message: this.message,
            total: this.total,
            cantidad: this.cantidad,
            direccion:this.direccion,
            localidad:this.localidad,
            codgoPostal:this.codgoPostal
          }
        ); 
        this.$emit("okDetallesPersonales");
         this.$root.$bvToast.toast(
              "Gracias por elegirnos! En breve recibiras un mail, por favor revisa en correos no deseados,",
              {
                title: "Se envio su pedido",
                toaster: "b-toaster-bottom-center rounded-0 succes b-toaster-bottom-center",
                solid: true,
                variant: "success",
              }
            );
            
      } catch (error) {
        console.log({ error });
      } 
    },
  },
};
</script>

<style>
.form b-form-group {
  font-family: "Roboto";
}
#radio-group-1 {
  font-family: "Roboto";
}
span {
  font-family: "Roboto";
}
input {
  font-size: 16px;
}
.nombre {
  font-size: 16px;
  font-family: "Roboto";
}
</style>