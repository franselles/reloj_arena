'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HorarioOperariosSchema = Schema({
    nombre: String,
    activo: Boolean,
    dni: String,
    legal: Boolean,
    pass: String,
    seccion_id: String,
    cotizacion_id: String,
    hora_inicio: String,
    hora_fin: String,
    max: Number,
    observacion: String
});

module.exports = mongoose.model('horario_operarios', HorarioOperariosSchema);
