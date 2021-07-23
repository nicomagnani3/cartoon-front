<template>
   <footer id="sticky-footer" class="footer text-center">
    <span>
      <a href="https://www.instagram.com/cartoon.tag/" target="_black">
        <img
          class="logoCartoon"
          src="@/assets/instalogo.png"
          alt=""
          height="auto"
        />
      </a>
    </span>
    <span>
      <a
        href="https://mail.google.com/mail/?view=cm&fs=1&to=cartoon.tag@hotmail.com"
        target="_black"
      >
        <img class="logoMail" src="@/assets/mail.png" alt="" height="auto" />
      </a>
    </span>
  </footer> 
<!-- 
  <footer>
    <div class="container" id="contacto">
      <div class="row">
        <div class="col-md-12">
          <h1>CONTACTO</h1>
          <br /><br />
        </div>
      </div>
      <div class="row social">
        <div class="col-3"></div>
        <div class="col-2">
          <a href="mailto:contacto@maliciusculebra.com"
            ><img src="@/assets/mail1.svg" alt=""
          /></a>
        </div>

        <div class="col-2">
          <a target="_blank" href="https://www.instagram.com/jonatanariste/"
            ><img src="@/assets/insta2.svg" alt=""
          /></a>
        </div>
      </div>
    </div>
  </footer> -->
</template>


<script>
export default {
  name: "Footer",
  data() {
    return {
      imgFooter: "od_footer.png",
    };
  },
};
</script>


<style>
.footer-text {
  font-size: 80%;
}
#sticky-footer {
  background-color: #9d2d27;
}
.logoCartoon {
  max-width: 35px;
  margin: 15px;
}
.logoMail {
  max-width: 44px;
}/* 

footer {
  background: #757575;
  height: 50vh;
  padding-top: 30px;
}
footer h1 {
  text-align: center;
  font-weight: 100;
}
footer {
  padding-top: 10px;
}
.social {
  text-align: center;
}
.social img {
  width: 30%;
  text-align: center;
}
.social img {
  width: 100%;
} */
</style>

