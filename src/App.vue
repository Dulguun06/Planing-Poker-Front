<template>
  <Navbar/>
  <RouterView/>
</template>

<script>
import Tasks from "@/views/Tasks.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Main",
  components: {
    Navbar,
    Tasks
  },
}
</script>


<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
}

body {
  background-color: #fca311 !important;
}

</style>
