'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HorarioCotizacionSchema = Schema({
    cotizacion: String,
    observacion: String
});

module.exports = mongoose.model(
    'horario_cotizaciones',
    HorarioCotizacionSchema
);
