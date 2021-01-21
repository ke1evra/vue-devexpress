<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="light" variant="light">
        <b-navbar-brand href="#" to="/" exact exact-active-class="active">
          <span class="">D</span>
          <span class="text-muted"> : </span>
          <span class="text-danger">A</span>
<!--          D L V-->
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/orders" exact exact-active-class="active">Заказы</b-nav-item>
            <b-nav-item to="/salesDynamics" exact exact-active-class="active">
                Динамика продаж</b-nav-item>
<!--        <b-nav-item to="/TextManipulate" exact exact-active-class="active">Текст</b-nav-item>-->
            <b-nav-item to="/calls" exact exact-active-class="active">Коллцентр</b-nav-item>
            <b-nav-item to="/monitoring" exact exact-active-class="active">Мониторинг</b-nav-item>
            <b-nav-item to="/expenses" exact exact-active-class="active">Расход</b-nav-item>
            <b-nav-item to="/callsMonitoring" exact exact-active-class="active">
                Мониторинг звонков</b-nav-item>
            <b-nav-item to="/storage" exact exact-active-class="active">Storage</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-select v-model="currentTheme"
              @change='changeTheme'>
                <option value="light">Светлая</option>
                <option value="dark">Темная</option>
              </b-form-select>
            </b-nav-form>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div class="container-fluid pt-3">
      <div class="row">
        <div class="col">
          <router-view :key='routerKey'/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            themes: {
                light: '/css/light.css',
                dark: '/css/dark.css',
            },
            currentTheme: 'dark',
            changeTheme: this.themeHelper(),
            routerKey: 1,
        };
    },
    created() {
        this.changeTheme('dark');
    },
    methods: {
        themeHelper() {
            let currentLink = null;

            return (themeName) => {
                const href = this.themes[themeName];
                const link = document.createElement('link');
                link.id = 'stylesLink';

                if (currentLink) {
                    currentLink.remove();
                }
                currentLink = link;

                link.rel = 'stylesheet';
                link.href = href;

                this.currentTheme = themeName;

                document.head.appendChild(link);
                link.onload = () => {
                    this.routerKey += 1;
                };
            };
        },
    },
};
</script>

<style lang="scss">
  /*@import "assets/scss/custom.scss";*/
  @import "~devextreme/dist/css/dx.common.css";
  @import "~devextreme/dist/css/dx.light.compact.css";
  @import "~bootstrap/scss/bootstrap.scss";
  @import "~bootstrap-vue/src/index.scss";
</style>

<!--<style lang="scss" module="theme-dark">-->
<!--  @import "assets/scss/custom.scss";-->
<!--  @import '~bootstrap/scss/bootstrap.scss';-->
<!--  @import '~bootstrap-vue/src/index.scss';-->
<!--</style>-->
