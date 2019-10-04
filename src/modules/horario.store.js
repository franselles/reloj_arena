import Vue from 'vue';
import moment from 'moment';

export default {
  namespaced: true,
  state: {
    operario: null,
    operarios: [],
    secciones: [],
    cotizaciones: [],
    horarios: [],
    horarioDia: null
  },
  mutations: {
    setOperarios(state, payload) {
      state.operarios = payload;
    },
    setSecciones(state, payload) {
      state.secciones = payload;
    },
    setCotizaciones(state, payload) {
      state.cotizaciones = payload;
    },
    setOperario(state, payload) {
      state.operario = payload;
    },
    setHorarios(state, payload) {
      state.horarios = payload;
      console.log(state.horarios);
    },
    resetHorario(state) {
      state.horarios = [];
    },
    pushHorario(state, payload) {
      state.horarios.push(payload);
    },
    nuevoOperario(state) {
      state.operario = null;
    },
    setHorarioDia(state, payload) {
      state.horarioDia = payload;
    }
  },
  actions: {
    async setCreacion({ state, commit }, payload) {
      commit('resetHorario');

      let n = 0;
      let totalDias;
      let cuentaDias = 0;
      let hora_inicio;
      let hora_fin;
      let fecha;
      let f1, f2;

      totalDias = moment(payload.fecha_2).diff(moment(payload.fecha_1), 'days');

      fecha = payload.fecha_1;
      hora_inicio = payload.hora_inicio;
      hora_fin = payload.hora_fin;

      while (n <= totalDias) {
        cuentaDias++;

        var tempo = new Object();

        n++;

        tempo.fecha = fecha;
        tempo.operario_id = payload.operario_id;
        tempo.seccion_id = payload.seccion_id;
        tempo.cotizacion_id = payload.cotizacion_id;
        tempo.turno = payload.turno;
        tempo.hora_inicio = hora_inicio;
        tempo.hora_fin = hora_fin;
        tempo.hi = hora_inicio;
        tempo.hf = hora_fin;
        tempo.horas_trabajadas = 0;
        tempo.horas_max = payload.horas_max;
        tempo.terminado = true;
        tempo.observacion = '';

        cuentaDias = n;

        if (cuentaDias == payload.dias_trabajo) {
          cuentaDias = 0;

          fecha = moment(tempo.fecha, 'YYYY-MM-DD')
            .add(1, 'days')
            .format('YYYY-MM-DD');
          f1 = moment(hora_inicio, 'YYYY-MM-DD HH:mm').add(1, 'days');
          f2 = moment(hora_fin, 'YYYY-MM-DD HH:mm').add(1, 'days');
          const diffInMinutes = f2.diff(f1, 'minutes');
          state.tempo.horas_trabajadas = diffInMinutes;
          hora_inicio = f1.format('YYYY-MM-DD HH:mm');
          hora_fin = f2.format('YYYY-MM-DD HH:mm');

          continue;
        }
        commit('pushHorario', tempo);

        cuentaDias++;

        fecha = moment(tempo.fecha, 'YYYY-MM-DD')
          .add(1, 'days')
          .format('YYYY-MM-DD');
        f1 = moment(hora_inicio, 'YYYY-MM-DD HH:mm').add(1, 'days');
        f2 = moment(hora_fin, 'YYYY-MM-DD HH:mm').add(1, 'days');
        const diffInMinutes = f2.diff(f1, 'minutes');
        tempo.horas_trabajadas = diffInMinutes;
        hora_inicio = f1.format('YYYY-MM-DD HH:mm');
        hora_fin = f2.format('YYYY-MM-DD HH:mm');
      }
    },
    async getOperarios({ commit }) {
      try {
        const { data } = await Vue.axios({
          method: 'get',
          url: 'horarios/operarios'
        });
        commit('setOperarios', data);
      } catch (e) {
        console.log('todosError', e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para obtener los operarios ha finalizado');
      }
    },
    async getOperario({ commit }, payload) {
      try {
        const id = payload;
        const { data } = await Vue.axios({
          method: 'get',
          url: `horarios/operario/${id}`
        });
        commit('setOperario', data);
      } catch (e) {
        console.log('todosError', e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para obtener los operarios ha finalizado');
      }
    },
    async getHorariosFecha({ commit }, payload) {
      const fecha_1 = payload.fecha_1;
      const fecha_2 = payload.fecha_2;
      try {
        const { data } = await Vue.axios({
          method: 'get',
          url: `horarios/control/todos/fecha/${fecha_1}/${fecha_2}`
        });
        commit('setHorarios', data);
      } catch (e) {
        console.log('todosError', e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para obtener los horarios ha finalizado');
      }
    },
    async getHorariosFechaOperario({}, payload) {
      const fecha_1 = payload.fecha_1;
      const fecha_2 = payload.fecha_2;
      const id = payload.id;
      try {
        const { data } = await Vue.axios({
          method: 'get',
          url: `/horarios/control/operario/fecha/${fecha_1}/${fecha_2}/${id}`
        });
        return data;
      } catch (e) {
        console.log('todosError', e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para obtener los horarios ha finalizado');
      }
    },
    async getHorariosTotalFechaOperario({}, payload) {
      const fecha_1 = payload.fecha_1;
      const fecha_2 = payload.fecha_2;
      const id = payload.id;
      try {
        const { data } = await Vue.axios({
          method: 'get',
          url: `/horarios/suma/operario/fecha/${fecha_1}/${fecha_2}/${id}`
        });

        if (data[0]) {
          return data[0].horas_trabajadas;
        } else {
          return 0;
        }
      } catch (e) {
        console.log('todosError', e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para obtener los horarios ha finalizado');
      }
    },
    async deleteHorariosFechaOperario({}, payload) {
      const fecha_1 = payload.fecha_1;
      const fecha_2 = payload.fecha_2;
      const id = payload.id;
      try {
        const { data } = await Vue.axios({
          method: 'delete',
          url: `/horarios/creacion/${fecha_1}/${fecha_2}/${id}`
        });
        return true;
      } catch (e) {
        console.log('todosError', e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para obtener los horarios ha finalizado');
      }
    },
    async postCreacion({ state }) {
      const payload = state.horarios;
      try {
        await Vue.axios({
          method: 'post',
          url: '/horarios/creacion',
          data: payload
        });
      } catch (e) {
        console.log(e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para crear creacion ha finalizado');
      }
    },
    async getSecciones({ commit }) {
      try {
        const { data } = await Vue.axios({
          method: 'get',
          url: '/horarios/secciones'
        });
        commit('setSecciones', data);
      } catch (e) {
        console.log('todosError', e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para obtener las secciones ha finalizado');
      }
    },
    async getSeccion({}, payload) {
      const id = payload;

      try {
        const { data } = await Vue.axios({
          method: 'get',
          url: `/horarios/seccion/${id}`
        });
        return data;
      } catch (e) {
        console.log('todosError', e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para obtener la seccion ha finalizado');
      }
    },
    async getCotizaciones({ commit }) {
      try {
        const { data } = await Vue.axios({
          method: 'get',
          url: '/horarios/cotizaciones'
        });
        commit('setCotizaciones', data);
      } catch (e) {
        console.log('todosError', e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para obtener las cotizaciones ha finalizado');
      }
    },
    async postOperario({ dispatch }, payload) {
      try {
        await Vue.axios({
          method: 'post',
          url: '/horarios/operario',
          data: payload
        });
        dispatch('getOperarios');
      } catch (e) {
        console.log(e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para crear operario ha finalizado');
      }
    },
    async updateOperario({ dispatch }, payload) {
      try {
        await Vue.axios({
          method: 'put',
          url: `/horarios/operario/${payload._id}`,
          data: {
            nombre: payload.nombre,
            activo: payload.activo,
            dni: payload.dni,
            legal: payload.legal,
            pass: payload.pass,
            seccion_id: payload.seccion_id,
            cotizacion_id: payload.cotizacion_id,
            hora_inicio: payload.hora_inicio,
            hora_fin: payload.hora_fin,
            max: payload.max,
            observacion: payload.observacion
          }
        });
        dispatch('getOperarios');
      } catch (e) {
        console.log(e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para actualizar operario ha finalizado');
      }
    },
    async deleteOperario({ dispatch }, payload) {
      const id = payload;
      try {
        await Vue.axios({
          method: 'delete',
          url: `/horarios/operario/${id}`
        });
        dispatch('getOperarios');
      } catch (e) {
        console.log('todosError', e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para borrar el operario ha finalizado');
      }
    },
    async getHorariosTotalFecha({}, payload) {
      const fecha_1 = payload.fecha_1;
      const fecha_2 = payload.fecha_2;
      try {
        const { data } = await Vue.axios({
          method: 'get',
          url: `/horarios/control/todos/fecha/${fecha_1}/${fecha_2}`
        });
        return data;
      } catch (e) {
        console.log('todosError', e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para obtener los horarios ha finalizado');
      }
    },
    async getHorarioDetalle({ commit }, payload) {
      const id = payload;
      try {
        const { data } = await Vue.axios({
          method: 'get',
          url: `/horarios/control/${id}`
        });
        commit('setHorarioDia', data);
      } catch (e) {
        console.log('todosError', e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para obtener el horario ha finalizado');
      }
    },
    async updateHora({}, payload) {
      try {
        await Vue.axios({
          method: 'put',
          url: `/horarios/control/${payload._id}`,
          data: {
            fecha: payload.fecha,
            operario_id: payload.operario_id,
            seccion_id: payload.seccion_id,
            cotizacion_id: payload.cotizacion_id,
            nombre: payload.nombre,
            dni: payload.dni,
            turno: payload.turno,
            hora_inicio: payload.hora_inicio,
            hora_fin: payload.hora_fin,
            hi: payload.hi,
            hf: payload.hf,
            horas_trabajadas: payload.horas_trabajadas,
            horas_max: payload.horas_max,
            terminado: payload.terminado,
            observacion: payload.observacion
          }
        });
      } catch (e) {
        console.log('todosError', e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para actualizar el horario ha finalizado');
      }
    },
    async deleteHora({}, payload) {
      const id = payload._id;

      try {
        await Vue.axios({
          method: 'delete',
          url: `/horarios/control/${id}`
        });
      } catch (error) {
        console.log('todosError', e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para eliminar el horario ha finalizado');
      }
    }
  },
  getters: {
    lasFechas: () => {
      const date = new Date();
      const dia = (date.getDate() < 10 ? '0' : '') + date.getDate();
      const mes = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
      const ano = date.getFullYear();

      const fechaDia = ano + '-' + mes + '-' + dia;
      const fechaUno = ano + '-' + mes + '-' + '01';
      const fechaUnoAno = ano + '-01-01';

      return {
        fechaDia,
        fechaUno,
        fechaUnoAno
      };
    }
  }
};