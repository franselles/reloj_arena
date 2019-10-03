<template>
  <div>
    <div>
      <div class="alert alert-warning" role="alert">LISTADO DE HORAS</div>
      <div
        v-if="operario !== null"
        class="alert alert-dark"
        role="alert"
      >OPERARIO {{ operario.nombre }} - {{ operario.dni}}</div>
    </div>
    <b-form v-on:submit.prevent="onSubmit" @reset="onReset">
      <b-form-group
        id="nombre"
        label="Nombre:"
        label-for="nombre"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="nombre"
          type="text"
          required
          placeholder="Nombre del operario"
          v-model="localOperario.nombre"
          onkeyup="this.value = this.value.toUpperCase();"
        ></b-form-input>
      </b-form-group>

      <b-form-checkbox
        id="activo"
        name="activo"
        value="true"
        unchecked-value="false"
        v-model="localOperario.activo"
      >Esta activo</b-form-checkbox>

      <b-form-group id="dni" label="DNI/NIE" label-for="dni">
        <b-form-input
          id="dni"
          required
          placeholder="DNI / NIE"
          v-model="localOperario.dni"
          onkeyup="this.value = this.value.toUpperCase();"
        ></b-form-input>
      </b-form-group>

      <b-form-checkbox
        id="legal"
        name="legal"
        value="true"
        unchecked-value="false"
        v-model="localOperario.legal"
      >Aviso legal</b-form-checkbox>

      <b-form-group id="pass" label="Password" label-for="pass">
        <b-form-input id="pass" placeholder="Password" v-model="localOperario.pass"></b-form-input>
      </b-form-group>

      <b-form-group id="seccion" label="Seccion" label-for="seccion">
        <b-form-select
          id="seccion"
          required
          @change="verSeccion"
          v-model="localOperario.seccion_id"
        >
          <option v-for="item in secciones" :key="item._id" :value="item._id">{{item.seccion}}</option>
        </b-form-select>
      </b-form-group>
      <b-form-group id="cotizacion" label="Cotizacion" label-for="cotizacion">
        <b-form-select id="cotizacion" required v-model="localOperario.cotizacion_id">
          <option v-for="item in cotizaciones" :key="item._id" :value="item._id">{{item.cotizacion}}</option>
        </b-form-select>
      </b-form-group>

      <b-form-group
        id="hora_inicio"
        label="Hora inicio:"
        label-for="hora_inicio"
        description="We'll never share your email with anyone else."
      >
        <b-form-input id="hora_inicio" type="time" v-model="localOperario.hora_inicio"></b-form-input>
      </b-form-group>
      <b-form-group
        id="hora_fin"
        label="Hora fin:"
        label-for="hora_fin"
        description="We'll never share your email with anyone else."
      >
        <b-form-input id="hora_fin" type="time" v-model="localOperario.hora_fin"></b-form-input>
      </b-form-group>

      <b-form-group
        id="max"
        label="Maximo minutos de trabajo"
        label-for="max"
        description="We'll never share your email with anyone else."
      >
        <b-form-input id="max" type="number" v-model="localOperario.max"></b-form-input>
      </b-form-group>

      <b-form-textarea
        id="observacion"
        placeholder="Observacion"
        rows="3"
        max-rows="6"
        v-model="localOperario.observacion"
      ></b-form-textarea>

      <b-button type="submit" variant="primary">Aceptar</b-button>
      <b-button type="reset" variant="success">Reset</b-button>
      <b-button type="button" variant="danger" @click="eliminarOperario()">ELIMINAR</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  name: 'operario',
  data() {
    return {
      esNuevo: false,
      localOperario: {
        _id: null,
        nombre: null,
        activo: null,
        dni: null,
        legal: null,
        pass: null,
        seccion_id: null,
        cotizacion_id: null,
        hora_inicio: null,
        hora_fin: null,
        max: null,
        observacion: null
      }
    };
  },
  mounted() {
    this.getSecciones();
    this.getCotizaciones();
    if (this.operario == null) {
      this.localOperario._id = null;
    } else {
      this.localOperario._id = this.operario._id;
      this.localOperario = this.operario;
    }
  },
  computed: {
    ...mapState('horarioStore', ['operario', 'secciones', 'cotizaciones'])
  },
  methods: {
    ...mapActions('horarioStore', [
      'getSecciones',
      'getCotizaciones',
      'getSeccion',
      'postOperario',
      'updateOperario',
      'deleteOperario'
    ]),
    ...mapMutations('horarioStore', ['nuevoOperario']),
    onSubmit() {
      if (this.localOperario._id == null) {
        this.postOperario(this.localOperario);
      } else {
        this.updateOperario(this.localOperario);
      }
      this.$router.push({ name: 'operarios' });
    },
    onReset() {},
    verSeccion(value) {
      this.getSeccion(value).then(response => {
        this.localOperario.hora_inicio = response.hora_inicio;
        this.localOperario.hora_fin = response.hora_fin;
      });
    },
    eliminarOperario() {
      if (this.localOperario._id != null) {
        this.deleteOperario(this.localOperario._id);
        this.$router.push({ name: 'operarios' });
      }
    }
  }
};
</script>
