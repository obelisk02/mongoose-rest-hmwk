const mongoose = require('mongoose');
const TeacherModel = mongoose.model('Teacher');

exports.getAll = function(req, res) {
    // TODO: Devolver todos los Teachers

}

exports.findOne = function(req, res) {
    // TODO: Devolver un Teacher con sus courses, sólo seleccionaremos el id y title de los cursos 

}

exports.createTeacher = function(req, res) {
     // TODO: Crear un Teacher

}

exports.updateTeacher = function(req, res) {
    // TODO: Actualizar Teacher (incluyendo courses)

}

exports.assignCourses = function(req, res) {
    // TODO: Asignar courses a un teacher, se recibirá como arreglo "coursesIds"
}

exports.deleteTeacher = function(req, res) {
    // TODO: Borrar Teacher (si tiene courses, no se podrá borrar)

}