<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <ul class="nav nav-tabs">
        <li class="nav-item"><router-link to="/" class="nav-link active">Home</router-link></li>
        <li class="nav-item"><router-link to="/marca/lista" class="nav-link active">Marca</router-link></li>
        <li class="nav-item"><router-link to="/modelo/lista" class="nav-link active">Modelo</router-link></li>
        <li class="nav-item"><router-link to="/veiculo/lista" class="nav-link active">Veiculo</router-link></li>
        <li class="nav-item"><router-link to="/condutor/lista" class="nav-link active">Condutor</router-link></li>
        <li class="nav-item"><router-link to="/movimentacao/lista" class="nav-link active">Movimentação</router-link></li>
        <li class="nav-item"><router-link to="/configuracao/lista" class="nav-link active">Configuração</router-link></li>
      </ul>
    </div>
  </nav>
  <router-view/>
</template>

<style lang="scss">

@import "~/node_modules/bootstrap/scss/bootstrap";
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  background-color: #ffffff;
}



li {
  padding: 12px;

  a {
    font-weight: bold;
    color: #030303;

    &.router-link-exact-active {
      color: #000000;
    }
  }
}

.router-link-nav{
  text-decoration: none;
  color: #000000;
}

.nav-bar-color{
  background-color: #000000;
}

body{
  background-color: #ffffff;
  margin: 0px;
  padding: 0px;
}


</style>
