<template>
  <div>
    <div>
      <div class="alert alert-warning" role="alert">CREAR / EDITAR COTIZACION</div>
      <div
        v-if="localCotizacion !== null"
        class="alert alert-dark"
        role="alert"
      >COTIZACION {{ localCotizacion.cotizacion }}</div>
    </div>
    <b-form v-on:submit.prevent="onSubmit">
      <b-form-group
        id="cotizacion"
        label="Seccion:"
        label-for="cotizacion"
        description="Nombre de la cotizacion en MAYUSCULAS."
      >
        <b-form-input
          id="cotizacion"
          type="text"
          required
          placeholder="Nombre de la cotizacion"
          v-model="localCotizacion.cotizacion"
          onkeyup="this.value = this.value.toUpperCase();"
        ></b-form-input>
      </b-form-group>

      <b-form-textarea
        id="observacion"
        placeholder="Observacion"
        rows="3"
        max-rows="6"
        v-model="localCotizacion.observacion"
      ></b-form-textarea>

      <b-button type="submit" variant="primary">Aceptar</b-button>
      <b-button type="button" variant="success" @click="onCancelar()">Cancelar</b-button>
      <b-button type="button" variant="danger" @click="eliminarCotizacion()">ELIMINAR</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'cotizacion',
  data() {
    return {
      localCotizacion: {
        cotizacion: null,
        observacion: null
      }
    };
  },
  mounted() {
    if (this.cotizacion != null) {
      this.localCotizacion = this.cotizacion;
    }
  },
  computed: {
    ...mapState('horarioStore', ['cotizacion'])
  },
  methods: {
    ...mapActions('horarioStore', [
      'deleteCotizacion',
      'postCotizacion',
      'updateCotizacion'
    ]),
    eliminarCotizacion() {
      this.deleteCotizacion(this.localCotizacion).then(() => {
        this.$router.push({ name: 'cotizaciones' });
      });
    },
    onCancelar() {
      this.$router.go(-1);
    },
    onSubmit() {
      if (this.localCotizacion._id == null) {
        this.postCotizacion(this.localCotizacion).then(() => {
          this.$router.push({ name: 'cotizaciones' });
        });
      } else {
        this.updateCotizacion(this.localCotizacion).then(() => {
          this.$router.push({ name: 'cotizaciones' });
        });
      }
    }
  }
};
</script>
