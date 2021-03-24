var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
//aqui definimos el endpoint (la url para acceder al recurso listarInvitados)
const invitados = require("../modulos/invitados/guest");
router.get("/v1/guest", invitados.listaInvitados);

const asistentes = require("../modulos/asistentes/status_assitance");
router.get("/v1/asistencia", asistentes.listaStatus);
module.exports = router;
