<template>
  <div>
    <div>
      <div class="alert alert-warning" role="alert">LISTADO DE OPERARIOS</div>
    </div>
    <div>
      <b-button variant="outline-primary" @click="nuevo">NUEVO</b-button>
    </div>
    <div>
      <b-table :items="operarios" :fields="fields">
        <template v-slot:cell(index)="row">{{ row['index'] + 1 }}</template>
        <template v-slot:cell(accion)="row">
          <button type="button" class="btn btn-primary btn-sm" @click="crear(row.item)">CREAR</button>
          <button type="button" class="btn btn-success btn-sm" @click="editar(row.item)">EDITAR</button>
          <button type="button" class="btn btn-warning btn-sm" @click="ver(row.item)">VER</button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
      fields: [
        // A virtual column that doesn't exist in items
        { key: 'index', label: '#' },
        // A column that needs custom formatting
        { key: 'nombre', label: 'Nombre' },
        // A regular column
        { key: 'accion', label: 'Accion' }
      ]
    };
  },
  mounted() {
    this.getOperarios();
  },
  methods: {
    ...mapActions('horarioStore', ['getOperario', 'getOperarios']),
    ...mapMutations('horarioStore', ['setOperario', 'nuevoOperario']),
    crear(data) {
      this.setOperario(data);
      this.$router.push({ name: 'diario' });
    },
    ver(data) {
      this.setOperario(data);
      this.$router.push({ name: 'horas' });
    },
    editar(data) {
      this.setOperario(data);
      this.$router.push({ name: 'operario' });
    },
    nuevo() {
      this.nuevoOperario();
      this.$router.push({ name: 'operario' });
    }
  },
  computed: {
    ...mapState('horarioStore', ['operarios'])
  }
};
</script>

<style scoped>
</style>