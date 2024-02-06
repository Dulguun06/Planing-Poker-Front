<template>
  <Navbar/>
  <RouterView :key="$route.fullPath"/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Home from "@/views/Rooms.vue";

export default {
  name: "Main",
  components: {
    Navbar,
    Home
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
  background-color: #fefefe !important;
}
h1{
  margin-bottom: 2rem;
  color: #1f4e6a;
}
</style>
