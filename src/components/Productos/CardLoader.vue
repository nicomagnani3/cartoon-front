<template>
  <div class="cardLoader">
    <div class="row">
      <div class="col-md-3" v-for="loop in loopCount" v-bind:key="loop">
       
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "cardLoader",
  props: ["loopCount"],
  components: {  },
};
</script>

<style >
</style>