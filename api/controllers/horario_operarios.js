'use strict';

const Horario_operarios = require('../models/horario_operarios');

function getHorarioOperarios(req, res) {
  Horario_operarios.find()
    .sort({ nombre: 1 })
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

function getHorarioOperarioDni(req, res) {
  let id = req.params.id;

  Horario_operarios.find({ dni: id, activo: true }, (err, doc) => {
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

function getHorarioOperario(req, res) {
  let id = req.params.id;

  Horario_operarios.findById(id, (err, doc) => {
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

function postHorarioOperario(req, res) {
  const operario = new Horario_operarios();

  operario.nombre = req.body.nombre;
  operario.activo = req.body.activo;
  operario.dni = req.body.dni;
  operario.legal = req.body.legal;
  operario.pass = req.body.pass;
  operario.seccion_id = req.body.seccion_id;
  operario.cotizacion_id = req.body.cotizacion_id;
  operario.hora_inicio = req.body.hora_inicio;
  operario.hora_fin = req.body.hora_fin;
  operario.max = req.body.max;
  operario.observacion = req.body.observacion;

  operario.save((err, docStored) => {
    if (err)
      res.status(500).send({
        message: `Error al salvar en la base de datos: ${err} `
      });

    res.status(200).send(docStored);
  });
}

function putHorarioOperario(req, res) {
  const id = req.params.id;
  const update = req.body;

  Horario_operarios.findByIdAndUpdate(id, update, (err, docStored) => {
    if (err)
      res.status(500).send({
        message: `Error al salvar en la base de datos: ${err} `
      });

    res.status(200).send(docStored);
  });
}

function deleteHorarioOperario(req, res) {
  const id = req.params.id;

  Horario_operarios.findByIdAndRemove(id, (err, docStored) => {
    if (err)
      res.status(500).send({
        message: `Error al salvar en la base de datos: ${err} `
      });

    res.status(200).send(docStored);
  });
}

module.exports = {
  getHorarioOperarios,
  getHorarioOperarioDni,
  getHorarioOperario,
  postHorarioOperario,
  putHorarioOperario,
  deleteHorarioOperario
};
