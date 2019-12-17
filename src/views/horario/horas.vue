<template>
  <div>
    <div>
      <div class="alert alert-warning" role="alert">LISTADO DE HORAS</div>
      <div class="alert alert-dark" role="alert">
        OPERARIO {{ operario.nombre }} - {{ operario.dni }}
      </div>
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
            <small id="fecha_1" class="form-text text-muted"
              >Fecha INICIAL para listar las horas.</small
            >
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
            <small id="fecha_2" class="form-text text-muted"
              >Fecha FINAL para listar las horas.</small
            >
          </div>
        </div>
        <div class="col noprint">
          <div class="form-group">
            <input
              type="checkbox"
              class="form-check-input"
              id="acciones"
              v-model="ocultar"
            />
            <label class="form-check-label" for="acciones">Desactivar</label>
            <small id="acciones" class="form-text text-muted"
              >Activar / Desactivar botones acciones.</small
            >
          </div>
        </div>
        <div class="col noprint">
          <div>
            <b-button variant="outline-primary" @click="nuevo">NUEVO</b-button>
          </div>
        </div>
      </div>
    </div>
    <b-table :items="horas" :fields="fields" foot-clone striped hover>
      <template v-slot:cell(index)="row" v-if="!ocultar">{{
        row.item.hora_inicio | onlyDay
      }}</template>
      <template v-slot:cell(hora_i)="row">{{
        row.item.hora_inicio | formatDate
      }}</template>
      <template v-slot:cell(hora_f)="row">{{
        row.item.hora_fin | formatDate
      }}</template>
      <template v-slot:cell(horas)="row">{{
        enHoras(row.item.horas_trabajadas)
      }}</template>
      <template v-slot:cell(accion)="row" v-if="!ocultar">
        <button
          type="button"
          class="btn btn-success btn-sm"
          @click="editar(row.item)"
        >
          EDITAR
        </button>
        <button
          type="button"
          class="btn btn-danger btn-sm"
          @click="borrar(row.item)"
        >
          BORRAR
        </button>
      </template>
      <template v-slot:foot(horas)="">
        <span class="text-danger">{{ enHoras(total) }}</span>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import dayjs from 'dayjs';

export default {
  name: 'horas',
  data() {
    return {
      ocultar: false,
      fecha_1: null,
      fecha_2: null,
      fields: [
        { key: 'index', label: '' },
        { key: 'hora_i', label: 'Inicio' },
        { key: 'hora_f', label: 'Fin' },
        { key: 'turno', label: 'Turno' },
        { key: 'horas', label: 'Horas' },
        { key: 'accion', label: '' }
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
    ...mapMutations('horarioStore', ['resetHorarioDia']),
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
    },
    nuevo() {
      this.resetHorarioDia();
      this.$router.push({ name: 'detalle' });
    }
  },
  filters: {
    formatDate(value) {
      if (value) {
        return dayjs(String(value)).format('DD-MM-YYYY hh:mm');
      }
    },
    onlyDay(value) {
      return dayjs(String(value)).format('DD');
    }
  }
};
</script>
<style scoped>
/* You can add global styles to this file, and also import other style files */
@media print {
  .noprint {
    display: none;
  }
}
</style>
