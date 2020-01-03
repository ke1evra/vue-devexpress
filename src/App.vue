<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">Dolgov</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/" exact exact-active-class="active">Home</b-nav-item>
            <b-nav-item to="/about" exact exact-active-class="active">About</b-nav-item>
            <b-nav-item to="/monitoring" exact exact-active-class="active">Мониторинг</b-nav-item>
          </b-navbar-nav>


        </b-collapse>
      </b-navbar>
    </div>
    <div class="container-fluid pt-3">
      <div class="row">
        <div class="col">
          <router-view/>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="scss">
</style>
