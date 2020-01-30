<template>
  <section>
    <div class="container pt-3">
      <div class="row justify-content-sm-center">
        <div class="col-sm-6 col-md-4">
          <div class="card border-info text-center">
            <div class="card-header">Introduce el PIN</div>
            <div class="card-body">
              <img src="@/assets/logo_hora.png" />
              <h4 class="text-center">RA BENIDORM</h4>
              <form class="form-signin" @submit.prevent="login">
                <input
                  type="password"
                  class="form-control mb-2"
                  placeholder="PIN"
                  maxlength="4"
                  required
                  v-model="pin"
                />
                <button
                  class="btn btn-lg btn-primary btn-block mb-1"
                  type="submit"
                >
                  Acceder
                </button>
                <a href="#" class="float-right">0.1.28</a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'login',
  data() {
    return {
      pin: null
    };
  },
  methods: {
    ...mapMutations('loginStore', ['setLogin']),
    login() {
      let usuario = this.usuarios.find(data => data.pin === this.pin);
      if (usuario) {
        this.setLogin();
        this.$router.push({ name: 'principal' });
      }
    }
  },
  computed: {
    ...mapState('loginStore', ['usuarios'])
  }
};
</script>
