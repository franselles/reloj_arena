<template>
  <div>
    <div>
      <div class="alert alert-warning" role="alert">DETALLE HORA</div>
      <div class="alert alert-dark" role="alert">
        OPERARIO {{ operario.nombre }} - {{ operario.dni }}
      </div>
    </div>
    <b-form v-on:submit.prevent="onSubmit">
      <b-form-group
        id="fecha"
        label="Fecha:"
        label-for="fecha"
        description="Fecha dia de trabajo del correspondiente turno."
      >
        <b-form-input
          id="fecha"
          type="date"
          v-model="dia.fecha"
          @change="diaHora"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="turno"
        label="Turno:"
        label-for="turno"
        description="Turno de trabajo de la jornada."
      >
        <b-form-input
          id="turno"
          type="number"
          v-model="dia.turno"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="hora_inicio"
        label="Hora inicio:"
        label-for="hora_inicio"
        description="FECHA HORA de INICIO de turno."
      >
        <b-form-input
          id="hora_inicio"
          type="text"
          v-model="dia.hora_inicio"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="hora_fin"
        label="Hora fin:"
        label-for="hora_fin"
        description="FECHA HORA de FINAL de turno."
      >
        <b-form-input
          id="hora_fin"
          type="text"
          v-model="dia.hora_fin"
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
      <b-form-group>
        <b-button type="button" variant="success" @click="calcular()"
          >CALCULAR</b-button
        >
      </b-form-group>

      <b-form-group
        id="horas_trabajadas"
        label="Horas trabajadas:"
        label-for="horas_trabajadas"
        description="Horas trabajadas en el correspondiente turno."
      >
        <b-form-input
          id="horas_trabajadas"
          type="text"
          v-model="dia.horas_trabajadas"
        ></b-form-input>
      </b-form-group>

      <b-form-checkbox
        id="terminado"
        name="terminado"
        value="true"
        unchecked-value="terminado"
        v-model="dia.terminado"
        >Terminado</b-form-checkbox
      >

      <b-form-textarea
        id="observacion"
        placeholder="Observacion"
        rows="3"
        max-rows="6"
        v-model="dia.observacion"
      ></b-form-textarea>

      <b-button type="submit" variant="primary">Aceptar</b-button>
      <b-button type="button" variant="warning" @click="onCancelar()"
        >Cancelar</b-button
      >
      <b-button type="button" variant="danger" @click="eliminar()"
        >ELIMINAR</b-button
      >
    </b-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';

export default {
  name: 'detalle',
  data() {
    return {
      dia: {
        _id: null,
        fecha: null,
        operario_id: null,
        seccion_id: null,
        cotizacion_id: null,
        nombre: null,
        dni: null,
        turno: 1,
        hora_inicio: null,
        hora_fin: null,
        hi: null,
        hf: null,
        horas_trabajadas: null,
        horas_max: null,
        terminado: null,
        observacion: null
      }
    };
  },
  mounted() {
    if (this.horarioDia != null) {
      this.dia = this.horarioDia;
    } else {
      this.dia.seccion_id = this.operario.seccion_id;
      this.dia.cotizacion_id = this.operario.cotizacion_id;
      this.dia.hora_inicio = this.operario.hora_inicio;
      this.dia.hora_fin = this.operario.hora_fin;
      this.dia.horas_max = this.operario.max;
      this.dia.operario_id = this.operario._id;
      this.dia.dni = this.operario.dni;
    }
  },
  computed: {
    ...mapState('horarioStore', ['operario', 'horarioDia'])
  },
  methods: {
    ...mapActions('horarioStore', ['updateHora', 'deleteHora', 'postHora']),
    onSubmit() {
      if (this.dia._id == null) {
        this.postHora(this.dia).then(() => {
          this.$router.go(-1);
        });
      } else {
        this.updateHora(this.dia).then(() => {
          this.$router.go(-1);
        });
      }
    },
    onCancelar() {
      this.$router.go(-1);
    },
    eliminar() {
      this.deleteHora(this.dia).then(() => {
        this.$router.go(-1);
      });
    },
    calcular() {
      const date1 = moment(this.dia.hora_inicio, 'YYYY-MM-DD HH:mm');
      const date2 = moment(this.dia.hora_fin, 'YYYY-MM-DD HH:mm');
      const diffInMinutes = date2.diff(date1, 'minutes');
      this.dia.horas_trabajadas = diffInMinutes;
    },
    diaHora() {
      if (this.dia.hora_inicio.length < 6) {
        this.dia.hora_inicio = this.dia.fecha + ' ' + this.dia.hora_inicio;
        this.dia.hora_fin = this.dia.fecha + ' ' + this.dia.hora_fin;
      }
    },
    cargaAutomatica(turno) {
      const fecha = moment(this.dia.fecha, 'YYYY-MM-DD')
        .add(1, 'days')
        .format('YYYY-MM-DD');
      switch (turno) {
        case 1:
          this.dia.hora_inicio = this.dia.fecha + ' 05:00';
          this.dia.hora_fin = this.dia.fecha + ' 09:00';
          break;
        case 2:
          this.dia.hora_inicio = this.dia.fecha + ' 18:00';
          this.dia.hora_fin = this.dia.fecha + ' 20:00';
          break;
        case 3:
          this.dia.hora_inicio = this.dia.fecha + ' 10:00';
          this.dia.hora_fin = this.dia.fecha + ' 14:00';
          break;
        case 4:
          this.dia.hora_inicio = this.dia.fecha + ' 14:00';
          this.dia.hora_fin = this.dia.fecha + ' 18:00';
          break;
        case 5:
          this.dia.hora_inicio = this.dia.fecha + ' 20:30';
          this.dia.hora_fin = fecha + ' 02:30';
          break;
        case 6:
          this.dia.hora_inicio = this.dia.fecha + ' 06:00';
          this.dia.hora_fin = this.dia.fecha + ' 12:00';
          break;
      }
    }
  }
};
</script>
