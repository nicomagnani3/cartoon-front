<template>
    <div class="Header text-left" >
        <img  class="logoHeader" src="@/assets/logoCartoon.png"  alt="logo" height="auto" >
    </div>

</template>

<script>
export default {
    name: "Header",
    data () {
        return {
            imgHeader: 'logoCartoon.png'
        }
    }
}
</script>

<style >

    .logoHeader {
        max-width: 100px;
}

    

</style>