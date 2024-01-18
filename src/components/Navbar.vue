<template>
  <nav class="navbar navbar-dark navbar-expand-lg" style="background-color: #14213d;">
    <div class="container-lg">
      <router-link class="navbar-brand" to="/">
        <img alt="Invescore logo"
             src="D:\ailab internship\invescore-logo.png"
             style="max-height: 40px !important; margin: 0 !important; padding-bottom: 10px !important;">
      </router-link>

      <button aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"
              class="navbar-toggler"
              data-bs-target="#navbarNavAltMarkup" data-bs-toggle="collapse" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarNavAltMarkup" class="collapse navbar-collapse">
        <div class="navbar-nav">
          <router-link class="nav-link" exact to="/">Home</router-link>
          <router-link class="nav-link" to="/about">About</router-link>
          <router-link class="nav-link" to="/tasks">Tasks</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
}
</script>


<style scoped>

</style>