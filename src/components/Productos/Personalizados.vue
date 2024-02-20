<template>
    <div class="personalizados-container">
      <div class="container">
        <div class="row">
          <div class="col"><br><br>
            <h3 class="text-center">Para realizar un pedido de Stickers Personalizados:</h3><br>
            <ol>
              <li>Enviar IMÁGENES de buena calidad en formato JPG, JPEG, PNG, SVG al correo electrónico <a href="mailto:cartoontag.stickers@gmail.com">cartoontag.stickers@gmail.com</a>. 📩</li>
              <li>Indicar el TAMAÑO, FIGURA y CANTIDAD de stickers por modelo.</li>
              <li>Te enviaremos un presupuesto de acuerdo a lo solicitado. 💲</li>
              <li>Para confirmar un PEDIDO, realiza la confirmación abonando el 50% del monto indicado. 💰</li>
              <li>Envíanos el comprobante de pago por correo o a nuestro WhatsApp. 📲 <a href="https://walink.co/432a76">WhatsApp Link</a></li>
              <li>Cuando tengamos listo el pedido, nos comunicaremos contigo para coordinar la entrega. 🎉</li>
            </ol>
            <div class="alert alert-warning" role="alert">
              <strong>⚠️ IMPORTANTE:</strong><br>
              <strong>❗ADJUNTAR LAS IMÁGENES, INDIVIDUALMENTE, AL CORREO ELECTRÓNICO.</strong> NO enviarlas dentro de un archivo Word o PDF.<br>
              La demora es de hasta 7 días luego del cierre del pedido; el mismo se informa por historias destacadas o puedes consultar la fecha programada de cierre antes de seleccionar los stickers. 📆
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mb-3" v-for="(image, index) in images" :key="index">
            <img :src="require(`@/assets/${image}`)" :alt="`Instrucción ${index + 1}`" class="img-fluid">
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        images: ['PERSONALIZADO_EXTRA.jpg', 'PERSONALIZADO_FIGURA.jpg', 'PERSONALIZADO_TAMAÑO.jpg'] // Rutas de tus imágenes en assets
      };
    }
  };
  </script>
  
  <style>
  .personalizados-container {
    height: auto; /* Establece la altura al tamaño del contenido */
    overflow-y: hidden; /* Oculta cualquier desplazamiento vertical */
  }

  .images-container {
    margin-bottom: 20px; /* Agrega un margen inferior de 20px */
    display: flex; /* Utiliza un layout flexible para las imágenes */
    flex-wrap: wrap; /* Permite que las imágenes se envuelvan si no caben en una sola fila */
    justify-content: space-between; /* Distribuye el espacio entre las imágenes */
  }

  .image-item {
    width: calc(33.33% - 10px); /* Establece el ancho de las imágenes y agrega un pequeño margen */
    margin-bottom: 10px; /* Agrega un pequeño margen inferior */
  }

  @media (max-width: 767px) {
    .personalizados-container {
      overflow-y: auto; /* Agrega desplazamiento vertical en dispositivos móviles */
    }
  }
</style>



  