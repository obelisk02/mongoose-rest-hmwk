const mongoose = require("mongoose");
const TeacherModel = mongoose.model("Teacher");

exports.getAll = function (req, res) {
  // TODO: Devolver todos los Teachers
  TeacherModel.find()
    .then((docs) => res.json(docs))
    .catch((err) => res.json({ err }));
};

exports.findOne = function (req, res) {
  // TODO: Devolver un Teacher con sus courses, sólo seleccionaremos el id y title de los cursos
  TeacherModel.findById(req.params.id, function (err, teacher) {
    if (err) {
      return res.send(400, err);
    }

    if (!teacher) {
        return res.status(404).json({ err: "Teacher not found" });
    }

    return res.json(teacher);
  }).populate("courses", "_id title");
};

exports.createTeacher = function (req, res) {
  // TODO: Crear un Teacher
  TeacherModel.create(req.body)
    .then((teacher) => res.json(teacher))
    .catch((err) => res.json({ err }));
};

exports.updateTeacher = function (req, res) {
  // TODO: Actualizar Teacher (incluyendo courses)
  TeacherModel.findByIdAndUpdate(req.params.id, req.body)
    .then((teacher) => res.json(teacher))
    .catch((err) => res.json({ err }));
};

exports.assignCourses = function (req, res) {
  // TODO: Asignar courses a un teacher, se recibirá como arreglo "coursesIds"
  TeacherModel.findByIdAndUpdate(req.params.id, {
    $push: { courses: req.body.coursesIds },
  })
    .then((teacher) => res.json(teacher))
    .catch((err) => res.json({ err }));
};

exports.deleteTeacher = function (req, res) {
  // TODO: Borrar Teacher (si tiene courses, no se podrá borrar)
  TeacherModel.findByIdAndRemove(req.params.id, function (err, teacher) {
    if (err) {
      return res.send(400, err);
    }

    return res.json(teacher);
  });
    
};
