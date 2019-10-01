'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HorarioSeccionSchema = Schema({
    seccion: String,
    hora_inicio: String,
    hora_fin: String,
    max: Number,
    observacion: String
});

module.exports = mongoose.model('horario_secciones', HorarioSeccionSchema);
