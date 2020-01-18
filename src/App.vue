<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="light" variant="light">
        <b-navbar-brand href="#">Dolgov</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/" exact exact-active-class="active">Home</b-nav-item>
            <b-nav-item to="/about" exact exact-active-class="active">About</b-nav-item>
            <b-nav-item to="/monitoring" exact exact-active-class="active">Мониторинг</b-nav-item>
            <b-nav-item to="/test" exact exact-active-class="active">Тест</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-select v-model="themeHelper.theme">
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
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line func-names
const ThemeHelper = function () {
  const preloadTheme = (href) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);

    return new Promise((resolve, reject) => {
      link.onload = (e) => {
        const { sheet } = e.target;
        sheet.disabled = true;
        resolve(sheet);
      };
      link.onerror = reject;
    });
  };

  const selectTheme = (themes, name) => {
    if (name && !themes[name]) {
      throw new Error(`"${name}" has not been defined as a theme.`);
    }
    // eslint-disable-next-line no-param-reassign,no-return-assign
    Object.keys(themes).forEach(n => (themes[n].disabled = n !== name));
  };

  const themes = {};

  return {
    // eslint-disable-next-line no-return-assign
    add(name, href) {
      // eslint-disable-next-line no-return-assign
      return preloadTheme(href).then(s => (themes[name] = s));
    },
    set theme(name) {
      selectTheme(themes, name);
    },
    get theme() {
      return Object.keys(themes).find(n => !themes[n].disabled);
    },
  };
};

export default {
  data() {
    return {
      themes: {
        light: '/css/light.css',
        dark: '/css/dark.css',
      },
      themeHelper: new ThemeHelper(),
      loading: true,
    };
  },
  created() {
    // add/load themes
    // eslint-disable-next-line max-len
    const added = Object.keys(this.themes).map(name => this.themeHelper.add(name, this.themes[name]));

    // eslint-disable-next-line no-unused-vars
    Promise.all(added).then((sheets) => {
      this.loading = false;
      this.themeHelper.theme = 'dark';
    });
  },
};
</script>

<style lang="scss">
/*@import "assets/scss/custom.scss";*/
@import "~devextreme/dist/css/dx.common.css";
@import "~devextreme/dist/css/dx.light.compact.css";
/*@import '~devextreme/dist/css/dx.dark.compact.css';*/
@import "~bootstrap/scss/bootstrap.scss";
@import "~bootstrap-vue/src/index.scss";
</style>

<!--<style lang="scss" module="theme-dark">-->
<!--  @import "assets/scss/custom.scss";-->
<!--  @import '~bootstrap/scss/bootstrap.scss';-->
<!--  @import '~bootstrap-vue/src/index.scss';-->
<!--</style>-->
