<template>
  <div>
    <div>
      <div class="alert alert-warning" role="alert">CREAR / EDITAR SECCION</div>
      <div v-if="localSeccion !== null" class="alert alert-dark" role="alert">
        SECCION {{ localSeccion.seccion }}
      </div>
    </div>
    <b-form v-on:submit.prevent="onSubmit">
      <b-form-group
        id="seccion"
        label="Seccion:"
        label-for="seccion"
        description="Nombre de la seccion."
      >
        <b-form-input
          id="seccion"
          type="text"
          required
          placeholder="Nombre de la seccion"
          v-model="localSeccion.seccion"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="hora_inicio"
        label="Hora inicio"
        label-for="hora_inicio"
        description="Hora INICIO de la jornada."
      >
        <b-form-input
          id="hora_inicio"
          type="time"
          required
          v-model="localSeccion.hora_inicio"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="hora_fin"
        label="Hora fin"
        label-for="hora_fin"
        description="Hora FINAL de la jornada."
      >
        <b-form-input
          id="hora_fin"
          type="time"
          required
          v-model="localSeccion.hora_fin"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="max"
        label="Maximo minutos de trabajo"
        label-for="max"
        description="Cantidad máxima en MINUTOS de la jornada."
      >
        <b-form-input
          id="max"
          type="number"
          v-model="localSeccion.max"
        ></b-form-input>
      </b-form-group>

      <b-form-textarea
        id="observacion"
        placeholder="Observacion"
        rows="3"
        max-rows="6"
        v-model="localSeccion.observacion"
      ></b-form-textarea>

      <b-button type="submit" variant="primary">Aceptar</b-button>
      <b-button type="button" variant="success" @click="onCancelar()"
        >Cancelar</b-button
      >
      <b-button type="button" variant="danger" @click="eliminarSeccion()"
        >ELIMINAR</b-button
      >
    </b-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'seccion',
  data() {
    return {
      localSeccion: {
        _id: null,
        seccion: null,
        hora_inicio: null,
        hora_fin: null,
        max: null,
        observacion: null
      }
    };
  },
  mounted() {
    if (this.seccion != null) {
      this.localSeccion = this.seccion;
    }
  },
  computed: {
    ...mapState('horarioStore', ['seccion'])
  },
  methods: {
    ...mapActions('horarioStore', [
      'deleteSeccion',
      'postSeccion',
      'updateSeccion'
    ]),
    eliminarSeccion() {
      this.deleteSeccion(this.localSeccion).then(() => {
        this.$router.push({ name: 'secciones' });
      });
    },
    onCancelar() {
      this.$router.go(-1);
    },
    onSubmit() {
      if (this.localSeccion._id == null) {
        this.postSeccion(this.localSeccion).then(() => {
          this.$router.push({ name: 'secciones' });
        });
      } else {
        this.updateSeccion(this.localSeccion).then(() => {
          this.$router.push({ name: 'secciones' });
        });
      }
    }
  }
};
</script>
