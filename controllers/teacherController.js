const mongoose = require('mongoose');
const Teacher = mongoose.model('Teacher');

exports.getAll = function(req, res) {
    // TODO: Devolver todos los Teachers

}

exports.findOne = function(req, res) {
    // TODO: Devolver un Teacher con sus grupos

}

exports.createTeacher = function(req, res) {
     // TODO: Crear un Teacher

}

exports.updateTeacher = function(req, res) {
    // TODO: Actualizar Teacher (info o courses)

}

exports.assignCourses = function(req, res) {
    // TODO: Asignar courses a un teacher, se recibirá como arreglo "coursesIds"
}

exports.deleteTeacher = function(req, res) {
    // TODO: Borrar Teacher (si tiene courses, no se podrá borrar)

}