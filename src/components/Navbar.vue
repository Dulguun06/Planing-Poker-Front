<template>
  <nav class="navbar navbar-expand-lg shadow-lg border-dark-subtle border-1">
    <div class="container-lg">
      <router-link class="navbar-brand" to="/">
        <img alt="Invescore logo"
             src="../images/invescore-logo.webp"
             style="max-height: 40px !important; margin: 0 !important; padding-bottom: 10px !important;">
      </router-link>

      <button aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"
              class="navbar-toggler"
              data-bs-target="#navbarNavAltMarkup" data-bs-toggle="collapse" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="navbarNavAltMarkup" class="collapse navbar-collapse">
        <div class="navbar-nav">
          <router-link class="nav-link" exact to="/">Rooms</router-link>
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
*{
  background-color:#fefefe;
  color: #1f4e6a;
}
.router-link-active {
  color: #1f4e6a;
  font-weight: 500
}
.nav-link:hover {
  background-color:#1f4e6a ;
  color: white;
  font-weight: 500;
}
.navbar-brand:hover{
  background-color: white;
}

</style>