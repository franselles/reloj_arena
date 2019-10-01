'use strict';

const Horario_secciones = require('../models/horario_secciones');

function getHorarioSecciones(req, res) {
    Horario_secciones.find()
        .sort({ seccion: -1 })
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

function getHorarioSeccion(req, res) {
    let id = req.params.id;

    Horario_secciones.findById(id, (err, doc) => {
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

function postHorarioSeccion(req, res) {
    const seccion = new Horario_secciones();

    seccion.seccion = req.body.seccion;
    seccion.hora_inicio = req.body.hora_inicio;
    seccion.hora_fin = req.body.hora_fin;
    seccion.max = req.body.max;
    seccion.observacion = req.body.observacion;

    seccion.save((err, docStored) => {
        if (err)
            res.status(500).send({
                message: `Error al salvar en la base de datos: ${err} `
            });

        res.status(200).send(docStored._id);
    });
}

function putHorarioSeccion(req, res) {
    const id = req.params.id;
    const update = req.body;

    Horario_secciones.findByIdAndUpdate(id, update, (err, docStored) => {
        if (err)
            res.status(500).send({
                message: `Error al salvar en la base de datos: ${err} `
            });

        res.status(200).send(docStored);
    });
}

function deleteHorarioSeccion(req, res) {
    const id = req.params.id;

    Horario_secciones.findByIdAndRemove(id, (err, docStored) => {
        if (err)
            res.status(500).send({
                message: `Error al salvar en la base de datos: ${err} `
            });

        res.status(200).send(docStored);
    });
}

module.exports = {
    getHorarioSecciones,
    getHorarioSeccion,
    postHorarioSeccion,
    putHorarioSeccion,
    deleteHorarioSeccion
};
