const dbCon = require("../Configuracion/Config");

function listarOrganizadores(req, res, next) {
  dbCon.any("SELECT * FROM organizer").then(function (data) {
    res.json({
      status: "ok",
      result: data,
      mensaje: "LISTA DE organizadores",
    });
  });
}

function registrarOrganizador(req, res, next) {
  const query =
    "INSERT INTO organizer (name, created_by, updated_by)" +
    "VALUES (${name},${user_id},${user_id} )";
  console.log(req.body);
  dbCon
    .any(query, req.body)
    .then(function (data) {
      res.json({
        status: "ok",
        result: data,
        mensaje: "Organizador registrado con exito",
      });
    })
    .catch(function (errorbd) {
      res.json({
        status: "error",
        result: "sin informacion",
        mensaje: errorbd,
      });
    });
}

async function editarOrganizador(req, res, next) {
  try {
    const { name, organizer_id } = req.body;
    const {
      rowCount,
    } = await db.result(
      "UPDATE organizer SET name = $1 WHERE organizer_id = $2",
      [name, organizer_id]
    );

    if (rowCount > 0) {
      res.json({
        status: "ok",
        message: "Organizador actualizado con exito",
        result: null,
      });
    } else {
      res.json({
        status: "error",
        message: "El organizador no existe",
        result: null,
      });
    }
  } catch (error) {
    res.json({ status: "error", result: null, message: error });
  }
}

function eliminarOrganizador(req, res, next) {
  var organizer_id = parseInt(req.params.id);
  dbCon
    .any("DELETE FROM organizer WHERE organizer_id= $1", organizer_id)
    .then(function (data) {
      res.json({
        status: "ok",
        result: "sin información",
        mensaje: "Organizador eliminado con exito",
      });
    })
    .catch(function (errorbd) {
      res.json({
        status: "error",
        result: "Sin informacion",
        mensaje: errorbd,
      });
    });
}

module.exports = {
  listarOrganizadores: listarOrganizadores,
  registrarOrganizador: registrarOrganizador,
  editarOrganizador: editarOrganizador,
  eliminarOrganizador: eliminarOrganizador,
};
