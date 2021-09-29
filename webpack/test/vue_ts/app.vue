
<template>
  <div>Hello, world! {{ name }}</div>
</template>

<script lang="ts">
const App = {
    data() {
        return {
            name: ''
        }
    },

    created() {
        let name: string = 'oldman'
        this.name = name;
    }
}

export default App;
</script>

<style>

</style>