<template>
  <div>
    <div class="alert alert-warning" role="alert">CREACION DE HORARIOS</div>
    <div class="alert alert-dark" role="alert">
      OPERARIO {{ operario.nombre }} - {{ operario.dni }}
    </div>
    <b-form @reset="onReset" v-on:submit.prevent="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Fecha desde"
        label-for="fecha_1"
        description="Fecha INICIAL para la creación de horas."
      >
        <b-form-input
          id="fecha_1"
          v-model="horario.fecha_1"
          type="date"
          @change="cargaHora"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-2"
        label="Fecha hasta"
        label-for="fecha_2"
        description="Fecha FINAL para la creación de horas."
      >
        <b-form-input
          id="fecha_2"
          v-model="horario.fecha_2"
          type="date"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-3"
        label="Hora inicio"
        label-for="hora_inicio"
        description="FECHA HORA de INICIO de turno."
      >
        <b-form-input
          id="hora_inicio"
          v-model="horario.hora_inicio"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-4"
        label="Hora fin"
        label-for="hora_fin"
        description="FECHA HORA de FINAL de turno."
      >
        <b-form-input
          id="hora_fin"
          v-model="horario.hora_fin"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <div>
        <b-button-group>
          <b-button @click="cargaAutomatica(6)">de 6 a 12</b-button>
          <b-button @click="cargaAutomatica(1)">de 5 a 9</b-button>
          <b-button @click="cargaAutomatica(2)">de 18 a 20</b-button>
          <b-button @click="cargaAutomatica(3)">de 10 a 14</b-button>
          <b-button @click="cargaAutomatica(4)">de 15 a 18</b-button>
          <b-button @click="cargaAutomatica(5)">de 20:30 a 02:30(+)</b-button>
        </b-button-group>
      </div>
      <b-form-group
        id="input-group-5"
        label="Dias trabajados a la semana"
        label-for="dias"
        description="Dias de trabajo antes del descanso."
      >
        <b-form-input
          id="dias"
          v-model="horario.dias_trabajo"
          type="number"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-6"
        label="Turno"
        label-for="turno"
        description="Turno de trabajo."
      >
        <b-form-input
          id="turno"
          v-model="horario.turno"
          type="number"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-alert v-model="show_c" variant="success" dismissible
          >Horarios creados</b-alert
        >
        <b-alert v-model="show" variant="danger" dismissible
          >Horarios eliminados</b-alert
        >
      </b-form-group>

      <b-button type="submit" variant="primary">Aceptar</b-button>
      <b-button type="reset" variant="success">Reset</b-button>
      <b-button type="button" variant="danger" @click="borrar">BORRAR</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import dayjs from 'dayjs';

export default {
  name: 'diario',
  data() {
    return {
      horario: {
        fecha_1: null,
        fecha_2: null,
        operario_id: null,
        seccion_id: null,
        cotizacion_id: null,
        hora_inicio: null,
        hora_fin: null,
        turno: 1,
        dias_trabajo: 365,
        horas_trabajadas: null,
        horas_max: null
      },
      show: false,
      show_c: false,
      idOperario: null
    };
  },
  mounted() {
    this.horario.fecha_1 = this.lasFechas.fechaUno;
    this.horario.fecha_2 = this.lasFechas.fechaDia;
  },
  computed: {
    ...mapState('horarioStore', ['operarios', 'operario']),
    ...mapGetters('horarioStore', ['lasFechas'])
  },
  methods: {
    ...mapActions('horarioStore', [
      'getHorariosFecha',
      'setCreacion',
      'deleteHorariosFechaOperario',
      'postCreacion'
    ]),
    editar() {
      this.horario.operario_id = this.operario._id;
      this.horario.seccion_id = this.operario.seccion_id;
      this.horario.cotizacion_id = this.operario.cotizacion_id;
    },
    cargaAutomatica(turno) {
      const fecha = dayjs(this.horario.fecha_1, 'YYYY-MM-DD')
        .add(1, 'days')
        .format('YYYY-MM-DD');

      switch (turno) {
        case 1:
          this.horario.hora_inicio = this.horario.fecha_1 + ' 05:00';
          this.horario.hora_fin = this.horario.fecha_1 + ' 09:00';
          break;
        case 2:
          this.horario.hora_inicio = this.horario.fecha_1 + ' 18:00';
          this.horario.hora_fin = this.horario.fecha_1 + ' 20:00';
          break;
        case 3:
          this.horario.hora_inicio = this.horario.fecha_1 + ' 10:00';
          this.horario.hora_fin = this.horario.fecha_1 + ' 14:00';
          break;
        case 4:
          this.horario.hora_inicio = this.horario.fecha_1 + ' 14:00';
          this.horario.hora_fin = this.horario.fecha_1 + ' 18:00';
          break;
        case 5:
          this.horario.hora_inicio = this.horario.fecha_1 + ' 20:30';
          this.horario.hora_fin = fecha + ' 02:30';
          break;
        case 6:
          this.horario.hora_inicio = this.horario.fecha_1 + ' 06:00';
          this.horario.hora_fin = this.horario.fecha_1 + ' 12:00';
          break;
      }
    },
    dateParser(date) {
      return new Date.parse(date);
    },
    onSubmit() {
      this.horario.operario_id = this.operario._id;
      this.horario.seccion_id = this.operario.seccion_id;
      this.horario.cotizacion_id = this.operario.cotizacion_id;
      this.horario.horas_max = this.operario.max;
      this.setCreacion(this.horario).then(() => {
        this.postCreacion();
        this.horario.turno++;
        this.show_c = true;
      });
    },
    borrar() {
      this.deleteHorariosFechaOperario({
        fecha_1: this.horario.fecha_1,
        fecha_2: this.horario.fecha_2,
        id: this.operario._id
      }).then(data => {
        if (data) {
          this.show = true;
        }
      });
    },
    onReset() {},
    cargaHora() {
      this.horario.hora_inicio =
        this.horario.fecha_1 + ' ' + this.operario.hora_inicio;
      this.horario.hora_fin =
        this.horario.fecha_1 + ' ' + this.operario.hora_fin;
    }
  }
};
</script>
