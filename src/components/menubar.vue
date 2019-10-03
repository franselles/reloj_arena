<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" fixed="top">
      <b-navbar-brand href="#">RA</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{name: 'operarios'}">Operarios</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav>
          <b-nav-item :to="{name: 'control'}">Control dia</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav>
          <b-nav-item-dropdown text="Otros">
            <b-dropdown-item href="#">AAA</b-dropdown-item>
            <b-dropdown-item href="#">BBB</b-dropdown-item>
            <b-dropdown-item href="#">CCC</b-dropdown-item>
            <b-dropdown-item href="#">DDD</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <!-- Right aligned nav items -->

        <b-navbar-nav class="ml-auto">
          <b-button size="sm" class="my-2 my-sm-0 btn-warning" @click="back">Back</b-button>
          <b-button size="sm" class="my-2 my-sm-0" @click="salir">Logout</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: 'menubar',
  methods: {
    ...mapMutations('loginStore', ['setLogout']),
    salir() {
      this.setLogout();
      this.$router.push('/');
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
