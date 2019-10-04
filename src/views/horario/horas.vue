<template>
  <div>
    <div>
      <div class="alert alert-warning" role="alert">LISTADO DE HORAS</div>
      <div class="alert alert-dark" role="alert">OPERARIO {{ operario.nombre }} - {{ operario.dni}}</div>
    </div>
    <div>
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="fecha_1">Fecha desde</label>
            <input
              type="date"
              class="form-control"
              id="fecha_1"
              v-model="fecha_1"
              @change="filtra()"
            />
            <small id="fecha_1" class="form-text text-muted">Fecha INICIAL para listar las horas.</small>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="fecha_2">Fecha desde</label>
            <input
              type="date"
              class="form-control"
              id="fecha_2"
              v-model="fecha_2"
              @change="filtra()"
            />
            <small id="fecha_2" class="form-text text-muted">Fecha FINAL para listar las horas.</small>
          </div>
        </div>
      </div>
    </div>
    <b-table :items="horas" :fields="fields" foot-clone>
      <template v-slot:cell(index)="row">{{ row['index'] + 1 }}</template>
      <template v-slot:cell(horas)="row">{{ enHoras(row.item.horas_trabajadas) }}</template>
      <template v-slot:cell(accion)="row">
        <button type="button" class="btn btn-success btn-sm" @click="editar(row.item)">EDITAR</button>
        <button type="button" class="btn btn-danger btn-sm" @click="borrar(row.item)">BORRAR</button>
      </template>
      <template v-slot:foot(horas)="row">
        <span class="text-danger">{{ enHoras(total) }}</span>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
  name: 'horas',
  data() {
    return {
      fecha_1: null,
      fecha_2: null,
      fields: [
        { key: 'index', label: '#' },
        { key: 'hora_inicio', label: 'Inicio' },
        { key: 'hora_fin', label: 'Fin' },
        { key: 'turno', label: 'Turno' },
        { key: 'horas', label: 'Horas' },
        { key: 'accion', label: 'Acciones' }
      ],
      horas: [],
      total: null
    };
  },
  mounted() {
    this.fecha_1 = this.lasFechas.fechaUnoAno;
    this.fecha_2 = this.lasFechas.fechaDia;
    this.filtra();
  },
  computed: {
    ...mapState('horarioStore', ['operario']),
    ...mapGetters('horarioStore', ['lasFechas'])
  },
  methods: {
    ...mapActions('horarioStore', [
      'getHorariosFechaOperario',
      'getHorariosTotalFechaOperario',
      'getOperario',
      'getHorarioDetalle',
      'deleteHora'
    ]),
    filtra() {
      this.getHorariosFechaOperario({
        fecha_1: this.fecha_1,
        fecha_2: this.fecha_2,
        id: this.operario._id
      }).then(data => {
        this.horas = data;
      });

      this.getHorariosTotalFechaOperario({
        fecha_1: this.fecha_1,
        fecha_2: this.fecha_2,
        id: this.operario._id
      }).then(data => {
        this.total = data;
      });
    },
    enHoras(totalMinutes) {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return hours + ':' + minutes;
    },
    editar(data) {
      this.getOperario(data.operario_id).then(() => {
        this.getHorarioDetalle(data._id).then(() => {
          this.$router.push({ name: 'detalle' });
        });
      });
    },
    borrar(data) {
      this.deleteHora(data).then(() => {
        for (let i = 0; i < this.horas.length; i++) {
          if (this.horas[i]._id === data._id) {
            this.horas.splice(i, 1);
          }
        }
      });
    }
  }
};
</script>