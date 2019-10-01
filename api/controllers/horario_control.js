'use strict';

const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

const Horario_control = require('../models/horario_control');

function getHorarioControl(req, res) {
  let id = req.params.id;

  Horario_control.findById(id, (err, doc) => {
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

function postHorarioControl(req, res) {
  const control = new Horario_control();

  control.fecha = req.body.fecha;
  control.operario_id = req.body.operario_id;
  control.seccion_id = req.body.seccion_id;
  control.cotizacion_id = req.body.cotizacion_id;
  control.nombre = req.body.nombre;
  control.dni = req.body.dni;
  control.turno = req.body.turno;
  control.hora_inicio = req.body.hora_inicio;
  control.hora_fin = req.body.hora_fin;
  control.minutos = req.body.minutos;
  control.hi = req.body.hi;
  control.hf = req.body.hf;
  control.horas_trabajadas = req.body.horas_trabajadas;
  control.horas_max = req.body.horas_max;
  control.terminado = req.body.terminado;
  control.observacion = req.body.observacion;

  control.save((err, docStored) => {
    if (err)
      res.status(500).send({
        message: `Error al salvar en la base de datos: ${err} `
      });

    res.status(200).send(docStored._id);
  });
}

function putHorarioControl(req, res) {
  const id = req.params.id;
  const update = req.body;

  Horario_control.findByIdAndUpdate(id, update, (err, docStored) => {
    if (err)
      res.status(500).send({
        message: `Error al salvar en la base de datos: ${err} `
      });

    res.status(200).send(docStored);
  });
}

function deleteHorarioControl(req, res) {
  const id = req.params.id;

  Horario_control.findByIdAndRemove(id, (err, docStored) => {
    if (err)
      res.status(500).send({
        message: `Error al salvar en la base de datos: ${err} `
      });

    res.status(200).send(docStored);
  });
}

function getHorarioControlFechaOperario(req, res) {
  Horario_control.find({
    fecha: { $gte: req.params.fecha_1, $lte: req.params.fecha_2 },
    operario_id: req.params.operario_id
  })
    .sort({
      fecha: 1,
      turno: 1
    })
    .exec((err, docs) => {
      if (err)
        return res.status(500).send({
          message: `Error al realizar la petición: ${err}`
        });
      if (!docs)
        return res.status(404).send({
          message: 'No existe'
        });

      res.status(200).send(docs);
    });
}

function getHorarioControlFecha(req, res) {
  Horario_control.find({
    fecha: { $gte: req.params.fecha_1, $lte: req.params.fecha_2 }
  })
    .sort({
      fecha: 1,
      turno: 1
    })
    .populate({
      path: 'operario_id',
      model: 'horario_operarios'
    })
    .sort({
      nombre: 1
    })
    .populate({
      path: 'seccion_id',
      model: 'horario_secciones'
    })
    .exec((err, docs) => {
      if (err)
        return res.status(500).send({
          message: `Error al realizar la petición: ${err}`
        });
      if (!docs)
        return res.status(404).send({
          message: 'No existe'
        });

      res.status(200).send(docs);
    });
}

function getHorarioControlOperarioAbierto(req, res) {
  Horario_control.find({
    operario_id: req.params.id,
    terminado: false
  })
    .sort({
      fecha: 1
    })
    .exec((err, docs) => {
      if (err)
        return res.status(500).send({
          message: `Error al realizar la petición: ${err}`
        });
      if (!docs)
        return res.status(404).send({
          message: 'No existe'
        });

      res.status(200).send(docs);
    });
}

function getHorarioCuentaTurnos(req, res) {
  Horario_control.countDocuments({
    operario_id: req.params.id,
    fecha: req.params.fecha,
    terminado: true
  }).exec((err, docs) => {
    if (err)
      return res.status(500).send({
        message: `Error al realizar la petición: ${err}`
      });
    if (!docs)
      return res.status(200).send({
        cuenta: 0
      });

    res.status(200).send({ cuenta: docs });
  });
}

function postHorarioCreacion(req, res) {
  Horario_control.insertMany(req.body, function(err, docStored) {
    if (err)
      res.status(500).send({
        message: `Error al salvar en la base de datos: ${err} `
      });

    res.status(200).send(docStored._id);
  });
}

function deleteHorarioCreacion(req, res) {
  Horario_control.deleteMany(
    {
      fecha: { $gte: req.params.fecha_1, $lte: req.params.fecha_2 },
      operario_id: req.params.operario_id
    },
    function(err, docStored) {
      if (err)
        res.status(500).send({
          message: `Error al borrar en la base de datos: ${err} `
        });

      res.status(200).send(docStored._id);
    }
  );
}

function getHorarioSumaFechaOperario(req, res) {
  Horario_control.aggregate([
    {
      $match: {
        fecha: { $gte: req.params.fecha_1, $lte: req.params.fecha_2 },
        operario_id: req.params.operario_id
      }
    },
    {
      $group: {
        _id: '$operario_id',
        horas_trabajadas: { $sum: '$horas_trabajadas' }
      }
    }
  ]).exec((err, docs) => {
    if (err)
      return res.status(500).send({
        message: `Error al realizar la petición: ${err}`
      });
    if (!docs)
      return res.status(404).send({
        message: 'No existe'
      });

    res.status(200).send(docs);
  });
}

module.exports = {
  getHorarioControl,
  postHorarioControl,
  putHorarioControl,
  deleteHorarioControl,
  getHorarioControlFechaOperario,
  getHorarioControlFecha,
  getHorarioControlOperarioAbierto,
  getHorarioCuentaTurnos,
  postHorarioCreacion,
  deleteHorarioCreacion,
  getHorarioSumaFechaOperario
};
