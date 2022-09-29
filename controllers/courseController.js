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

exports.getActiveCourses = function(req, res) {
    // TODO: Devolver todos los cursos con 'active' = true


    CourseModel.find ({active: true})
        .then(
            docs => res.json(docs)
        )
        .catch(
            err => res.json({ err })
        );
}

exports.findOne = async function(req, res) {
    /* 
        TODO: Encontrar curso por id y devolver con students, 
        solo seleccionar id y full_name de los students
    */ 

        const id = req.params.id;

        CourseModel.findById(id, function(err, course) {
            if (err) {
                return res.status(400).json({ err });
            }
    
            if (!course) {
                return res.status(404).json({ err: "Course not found" });
            }
    
            return res.json(course);
        }).populate("students", "_id first_name last_name");
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
    const id = req.params.id;

    CourseModel.findByIdAndUpdate(id, req.body, null , function (err, course) {
        if (err) {
            return res.status(400).json({ err });
        }

        if (course === null) {
            return res.status(404).json({ err: "Course not found" });
        }
        
        return res.json(course);
    }) 

}

exports.deleteCourse = function(req, res) {
    // TODO: Borrar curso, si tiene 'active' true, devolver mensaje de error
    const id = req.params.id;

    CourseModel.findByIdAndRemove(id, function(err, doc) {
        if (err) {
            return res.status(400).json({ err });
        }

        return res.status(204).send();
    })
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