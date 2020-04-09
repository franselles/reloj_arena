'use strict';

const express = require('express');
const api = express.Router();

const horarioControl = require('../controllers/horario_control');
const horarioSecciones = require('../controllers/horario_secciones');
const horarioCotizacones = require('../controllers/horario_cotizaciones');
const horarioOperarios = require('../controllers/horario_operarios');

api.get('/horarios/operarios', horarioOperarios.getHorarioOperarios);
api.get('/horarios/operario/dni/:id', horarioOperarios.getHorarioOperarioDni);
api.get('/horarios/operario/:id', horarioOperarios.getHorarioOperario);
api.post('/horarios/operario', horarioOperarios.postHorarioOperario);
api.put('/horarios/operario/:id', horarioOperarios.putHorarioOperario);
api.delete('/horarios/operario/:id', horarioOperarios.deleteHorarioOperario);

api.get('/horarios/secciones', horarioSecciones.getHorarioSecciones);
api.get('/horarios/seccion/:id', horarioSecciones.getHorarioSeccion);
api.post('/horarios/seccion', horarioSecciones.postHorarioSeccion);
api.put('/horarios/seccion/:id', horarioSecciones.putHorarioSeccion);
api.delete('/horarios/seccion/:id', horarioSecciones.deleteHorarioSeccion);

api.get('/horarios/cotizaciones', horarioCotizacones.getHorarioCotizaciones);
api.get('/horarios/cotizacion/:id', horarioCotizacones.getHorarioCotizacion);
api.post('/horarios/cotizacion', horarioCotizacones.postHorarioCotizacion);
api.put('/horarios/cotizacion/:id', horarioCotizacones.putHorarioCotizacion);
api.delete(
  '/horarios/cotizacion/:id',
  horarioCotizacones.deleteHorarioCotizacion
);

api.get('/horarios/control/:id', horarioControl.getHorarioControl);
api.get(
  '/horarios/control/operario/fecha/:fecha_1/:fecha_2/:operario_id',
  horarioControl.getHorarioControlFechaOperario
);
api.get(
  '/horarios/control/todos/fecha/:fecha_1/:fecha_2',
  horarioControl.getHorarioControlFecha
);
api.get(
  '/horarios/control/abierto/:id',
  horarioControl.getHorarioControlOperarioAbierto
);
api.get(
  '/horarios/control/cuenta/turnos/:id/:fecha',
  horarioControl.getHorarioCuentaTurnos
);

api.post('/horarios/control', horarioControl.postHorarioControl);
api.put('/horarios/control/:id', horarioControl.putHorarioControl);
api.delete('/horarios/control/:id', horarioControl.deleteHorarioControl);

api.post('/horarios/creacion', horarioControl.postHorarioCreacion);
api.delete(
  '/horarios/creacion/:fecha_1/:fecha_2/:operario_id',
  horarioControl.deleteHorarioCreacion
);
api.get(
  '/horarios/suma/operario/fecha/:fecha_1/:fecha_2/:operario_id',
  horarioControl.getHorarioSumaFechaOperario
);

api.get(
  '/horarios/resumen/operario/fecha/:fecha_1/:fecha_2/:operario_id',
  horarioControl.getResumenFechaOperario
);

api.get('/', function(request, response) {
  response.send('Eplayas!!!');
});

module.exports = api;
