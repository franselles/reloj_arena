<template>
  <div>
    <div>
      <div class="alert alert-warning" role="alert">RESUMEN OPERARIO</div>
      <div class="alert alert-dark" role="alert">
        OPERARIO {{ operario.nombre }} - {{ operario.dni }}
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col">
          <label for="fecha_1">Fecha desde</label>
          <input
            type="date"
            class="form-control"
            id="fecha_1"
            aria-describedby="fecha_1_help"
            v-model="fecha_1"
            @change="filtrar()"
          />
          <small id="fecha_1_help" class="form-text text-muted"
            >Fecha INICIAL para horas acumuladas del operario.</small
          >
        </div>
        <div class="col">
          <label for="fecha_2">Fecha fin</label>
          <input
            type="date"
            class="form-control"
            id="fecha_2"
            aria-describedby="fecha_2_help"
            v-model="fecha_2"
            @change="filtrar()"
          />
          <small id="fecha_2_help" class="form-text text-muted"
            >Fecha FINAL para horas acumuladas del operario.</small
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {};
  },
  methods: {
    filtrar() {}
  },
  computed: {
    ...mapState('horarioStore', ['operario'])
  }
};
</script>

<style></style>
