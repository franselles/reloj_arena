<template>
  <div>
    <div>
      <div class="alert alert-warning" role="alert">LISTADO DE SECCIONES</div>
    </div>
    <div>
      <b-button variant="outline-primary" @click="nuevo">NUEVO</b-button>
    </div>
    <div>
      <b-table :items="secciones" :fields="fields" striped hover>
        <template v-slot:cell(index)="row">{{ row['index'] + 1 }}</template>
        <template v-slot:cell(accion)="row">
          <button
            type="button"
            class="btn btn-success btn-sm"
            @click="editar(row.item)"
          >
            EDITAR
          </button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
export default {
  name: 'secciones',
  data() {
    return {
      fields: [
        { key: 'index', label: '#' },
        { key: 'seccion', label: 'Nombre' },
        { key: 'accion', label: 'Accion' },
      ],
    };
  },
  mounted() {
    this.getSecciones();
  },
  computed: {
    ...mapState('horarioStore', ['secciones']),
  },
  methods: {
    ...mapMutations('horarioStore', ['setSeccion', 'resetSeccion']),
    ...mapActions('horarioStore', ['getSecciones']),
    editar(data) {
      this.setSeccion(data);
      this.$router.push({ name: 'seccion' });
    },
    nuevo() {
      this.resetSeccion();
      this.$router.push({ name: 'seccion' });
    },
  },
};
</script>
