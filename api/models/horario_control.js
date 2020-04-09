'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HorarioControlSchema = Schema(
    {
        fecha: String,
        operario_id: String,
        seccion_id: String,
        // operario_id: { type: Schema.ObjectId, ref: 'horario_operarios' },
        // seccion_id: { type: Schema.ObjectId, ref: 'horario_secciones' },
        cotizacion_id: String,
        nombre: String,
        dni: String,
        turno: Number,
        hora_inicio: String,
        hora_fin: String,
        hi: String,
        hf: String,
        horas_trabajadas: Number,
        horas_max: Number,
        terminado: Boolean,
        observacion: String
    },
    { collection: 'horario_control' }
);

module.exports = mongoose.model('horario_control', HorarioControlSchema);
