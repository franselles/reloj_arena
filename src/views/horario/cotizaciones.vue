<template>
  <div>
    <div>
      <div class="alert alert-warning" role="alert">LISTADO DE COTIZACIONES</div>
    </div>
    <div>
      <b-button variant="outline-primary" @click="nuevo">NUEVO</b-button>
    </div>
    <div>
      <b-table :items="cotizaciones" :fields="fields">
        <template v-slot:cell(index)="row">{{ row['index'] + 1 }}</template>
        <template v-slot:cell(accion)="row">
          <button type="button" class="btn btn-success btn-sm" @click="editar(row.item)">EDITAR</button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
export default {
  name: 'cotizaciones',
  data() {
    return {
      cotizaciones: [],
      fields: [
        { key: 'index', label: '#' },
        { key: 'cotizacion', label: 'Nombre' },
        { key: 'accion', label: 'Accion' }
      ]
    };
  },
  mounted() {
    this.getCotizaciones().then(data => {
      this.cotizaciones = data;
    });
  },
  methods: {
    ...mapMutations('horarioStore', ['setCotizacion', 'resetCotizacion']),
    ...mapActions('horarioStore', ['getCotizaciones']),
    editar(data) {
      this.setCotizacion(data);
      this.$router.push({ name: 'cotizacion' });
    },
    nuevo() {
      this.resetCotizacion();
      this.$router.push({ name: 'cotizacion' });
    }
  }
};
</script>
