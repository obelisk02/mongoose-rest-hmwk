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

exports.getActiveCourses = async function(req, res) {
    // TODO: Devolver todos los cursos con 'active' = true
    CourseModel.find({"active": "true"})
    .then(docs => res.json(docs))
    .catch(
        err => res.json({err})
    )
}

exports.findOne = async function(req, res) {
    /* 
        TODO: Encontrar curso por id y devolver con students, 
        solo seleccionar id y full_name de los students
    */ 
    const id = req.params.id;

    CourseModel.findById(id)
    .populate("students", "_id first_name last_name")
    .then((course) => res.json(course))
    .catch((err) => res.json({ 
        err 
    }));

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

exports.updateCourse = async function(req, res) {
    // TODO: Actualizar curso, incluye actualizar 'active' a false
    const id = req.params.id;
    const body = req.body;
    CourseModel.findByIdAndUpdate({_id : id},{ "active": false }, body )
        .then((course) => res.json(course))
        .catch((err) => res.status(400).json({ err }))
        
    
}

exports.deleteCourse = async function(req, res) {
    // TODO: Borrar curso, si tiene 'active' true, devolver mensaje de error
    const id = req.params.id;

    CourseModel.findById(id)
    .then(function(course){
        if(course.active == "true"){

            return res.status(400).json({ error: "Curso activo"})
        }
        else{
            CourseModel.remove({_id: id} , function(error, deleted){
                if(error){
                    return res.json({ error })
                }
                return res.json({ message: "Eliminado correctamente"})
            })
            
        }
    })
    .catch((err) => res.json({ err }))
  

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