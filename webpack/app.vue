<template>
  <div class="text" @click="toast">
      Hello, Vue And Webpack
  </div>
</template>

<script>
export default {
    methods: {
        toast() {
            console.log('Hello, Vue And Webpack')
        }
    }
}
</script>

<style lang="scss">
.text {
    font-size: 30px;
    color: red;
}
</style>