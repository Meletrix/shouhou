<script setup lang="ts">
import TheMain from "../components/MainView.vue";
</script>

<template>
  <div class="Background">
    <main>
      <TheMain />
    </main>
  </div>
</template>

<style>
.Background {
  background: url("@/assets/imgs/bg-login.jpg") no-repeat;
  width: 100%;
  height: 100%;
  background-size: cover;
  position: fixed;
}
.header-wrapper .site-nav__link,
.header-wrapper .site-header__logo a,
.header-wrapper .site-nav__dropdown-link,
.header-wrapper .site-nav--has-dropdown > a.nav-focus,
.header-wrapper .site-nav--has-dropdown.nav-hover > a,
.header-wrapper .site-nav--has-dropdown:hover > a {
  color: #000000;
}

.header-wrapper .site-header__logo a:hover,
.header-wrapper .site-header__logo a:focus,
.header-wrapper .site-nav__link:hover,
.header-wrapper .site-nav__link:focus,
.header-wrapper .site-nav--has-dropdown a:hover,
.header-wrapper .site-nav--has-dropdown > a.nav-focus:hover,
.header-wrapper .site-nav--has-dropdown > a.nav-focus:focus,
.header-wrapper .site-nav--has-dropdown .site-nav__link:hover,
.header-wrapper .site-nav--has-dropdown .site-nav__link:focus,
.header-wrapper .site-nav--has-dropdown.nav-hover > a:hover,
.header-wrapper .site-nav__dropdown a:focus {
  color: rgba(0, 0, 0, 0.75);
}

.header-wrapper .burger-icon,
.header-wrapper .site-nav--has-dropdown:hover > a:before,
.header-wrapper .site-nav--has-dropdown > a.nav-focus:before,
.header-wrapper .site-nav--has-dropdown.nav-hover > a:before {
  background: #000000;
}

.header-wrapper .site-nav__link:hover .burger-icon {
  background: rgba(0, 0, 0, 0.75);
}

.site-header__logo img {
  max-width: 210px;
}

@media screen and (max-width: 768px) {
  .site-header__logo img {
    max-width: 100%;
  }
}
</style>
