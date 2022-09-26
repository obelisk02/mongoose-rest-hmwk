const mongoose = require('mongoose');
const CourseModel = mongoose.model('Course');

exports.getAll = async function(req, res) {
    CourseModel.find()
        .then(
            docs => res.json(docs)
        )
        .catch(
            err => res.json({ err })
        );
}

exports.findOne = async function(req, res) {
    // TODO: Encontrar curso por id y devolver con alumnos
}

exports.createCourse = function(req, res) {
    const body = req.body;

    CourseModel.create(body, function(err, newCourse) {
        if (err) {
            return res.send(400, err);
        }

        return res.json(newCourse);
    })
}

exports.updateCourse = function(req, res) {
    // TODO: Actualizar curso, incluye actualizar 'active' a false
}

exports.deleteCourse = function(req, res) {
    // TODO: Borrar curso, si tiene 'active' true, devolver mensaje de error
}

/**
 * 
 * En el body recibe un arreglo de [studentId] para asignar a la clase 
 */
exports.assignStudents = function(req, res) {
    const id = req.params.id;

    const studentIds = req.body.studentIds;

    CourseModel.findById(id, function(err, course){
        if (err) {
            return res.status(400).json({ err });
        }
        
        if (!course) {
            return res.status(404).json({ err: "Course not found" });
        }

        course.students = studentIds;

        course.save(function(err, savedCourse) {
            return res.json(savedCourse);
        })
    });
}