<template>
  <footer id="sticky-footer" class="footer text-center">
    <div style="background-color: #9d2d27;">
      <h5> Contactanos:
    <span>   
      <a href="https://www.instagram.com/cartoon.tag/" target="_black">
        <img
          class="logoCartoon"
          src="@/assets/instalogo.png"
          alt="logo cartoon"
          height="auto"
        />
      </a>
    </span>
    <span>
      <a
        href="https://mail.google.com/mail/?view=cm&fs=1&to=cartoon.tag@hotmail.com"
        target="_black"
      >
        <img class="logoMail" src="@/assets/mail.png" alt="logo mail" height="auto" />
      </a>
    </span></h5>
    </div>
  </footer>
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
@media only screen and (max-width: 480px) {
#sticky-footer {
  background-color: #9d2d27;
  text-align: left !important;
}
h5{
  font-size: 1.0rem;
}
}
.footer-text {
  font-size: 80%;
}
#sticky-footer {
  background-color: #9d2d27;
  height: 10vh;
}
.logoCartoon {
  max-width: 30px;
  margin: 10px;
}
.logoMail {
  max-width:35px;
  
} footer {
  background-color: #9d2d27;
  height: 40vh;
 
}
/* 


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

