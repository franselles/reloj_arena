<template>
  <div>
    <div>
      <div class="alert alert-warning" role="alert">HORARIOS POR FECHA</div>
    </div>
    <div>
      <div class="row">
        <div>
          <label>Pulsar para</label>
          <br />
          <button @click="filtrar()" type="button" class="btn btn-info btn-sm">
            ACTUALIZAR
          </button>
        </div>
        <div class="col">
          <label for="fecha_1">Fecha desde</label>
          <input
            type="date"
            class="form-control"
            id="fecha_1"
            aria-describedby="fecha_1_help"
            v-model="fecha_1"
          />
          <small id="fecha_1_help" class="form-text text-muted"
            >Fecha INICIAL para listar las horas de operarios.</small
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
          />
          <small id="fecha_2_help" class="form-text text-muted"
            >Fecha FINAL para listar las horas de operarios.</small
          >
        </div>
      </div>
    </div>
    <div>
      <b-table :items="horas" :fields="fields" striped hover>
        <template v-slot:cell(index)="row">{{ row['index'] + 1 }}</template>
        <template v-slot:cell(horas)="row">
          {{ enHoras(row.item.horas_trabajadas) }}
          <span class="error_exceso" v-if="exceso(row.item.horas_trabajadas)"
            >ERROR</span
          >
        </template>
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'control',
  data() {
    return {
      horas: null,
      fecha_1: null,
      fecha_2: null,
      fields: [
        { key: 'index', label: '#' },
        { key: 'operario_id.nombre', label: 'Operario' },
        { key: 'turno', label: 'Turno' },
        { key: 'hora_inicio', label: 'Hora inicio' },
        { key: 'hora_fin', label: 'Hora fin' },
        { key: 'horas', label: 'Horas trabajadas' },
        { key: 'accion', label: 'Acciones' },
      ],
    };
  },
  mounted() {
    this.fecha_1 = this.lasFechas.fechaUno;
    this.fecha_2 = this.lasFechas.fechaDia;
    this.filtrar();
  },
  methods: {
    ...mapActions('horarioStore', [
      'getHorariosTotalFecha',
      'getHorarioDetalle',
      'getOperario',
    ]),
    editar(data) {
      this.getOperario(data.operario_id._id).then(() => {
        this.getHorarioDetalle(data._id).then(() => {
          this.$router.push({ name: 'detalle' });
        });
      });
    },
    filtrar() {
      this.getHorariosTotalFecha({
        fecha_1: this.fecha_1,
        fecha_2: this.fecha_2,
      }).then((data) => {
        this.horas = data;
      });
    },
    enHoras(totalMinutes) {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return hours + ':' + minutes;
    },
    exceso(data) {
      if (data == null || data > 400 || data == 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  computed: {
    ...mapGetters('horarioStore', ['lasFechas']),
  },
};
</script>
<style scoped>
.error_exceso {
  color: red;
  font-weight: bold;
}
</style>
