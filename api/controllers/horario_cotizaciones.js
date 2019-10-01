'use strict';

const Horario_cotizaciones = require('../models/horario_cotizaciones');

function getHorarioCotizaciones(req, res) {
    Horario_cotizaciones.find()
        .sort({ cotizacion: -1 })
        .exec((err, doc) => {
            if (err)
                return res.status(500).send({
                    message: `Error al realizar la petición: ${err}`
                });
            if (!doc)
                return res.status(404).send({
                    message: 'No existe'
                });

            res.status(200).send(doc);
        });
}

function getHorarioCotizacion(req, res) {
    let id = req.params.id;

    Horario_cotizaciones.findById(id, (err, doc) => {
        if (err)
            return res.status(500).send({
                message: `Error al realizar la petición: ${err}`
            });
        if (!doc)
            return res.status(404).send({
                message: 'No existe'
            });

        res.status(200).send(doc);
    });
}

function postHorarioCotizacion(req, res) {
    const cotizacion = new Horario_cotizaciones();

    cotizacion.cotizacion = req.body.cotizacion;
    cotizacion.observacion = req.body.observacion;

    cotizacion.save((err, docStored) => {
        if (err)
            res.status(500).send({
                message: `Error al salvar en la base de datos: ${err} `
            });

        res.status(200).send(docStored._id);
    });
}

function putHorarioCotizacion(req, res) {
    const id = req.params.id;
    const update = req.body;

    Horario_cotizaciones.findByIdAndUpdate(id, update, (err, docStored) => {
        if (err)
            res.status(500).send({
                message: `Error al salvar en la base de datos: ${err} `
            });

        res.status(200).send(docStored);
    });
}

function deleteHorarioCotizacion(req, res) {
    const id = req.params.id;

    Horario_cotizaciones.findByIdAndRemove(id, (err, docStored) => {
        if (err)
            res.status(500).send({
                message: `Error al salvar en la base de datos: ${err} `
            });

        res.status(200).send(docStored);
    });
}

module.exports = {
    getHorarioCotizaciones,
    getHorarioCotizacion,
    postHorarioCotizacion,
    putHorarioCotizacion,
    deleteHorarioCotizacion
};
