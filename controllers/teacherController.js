const mongoose = require('mongoose');
const TeacherModel = mongoose.model('Teacher');

exports.getAll = function(req, res) {
    // TODO: Devolver todos los Teachers
    TeacherModel.find().then(docs => res.json(docs))
    .catch(err => res.json({ err }));
}

exports.findOne = function(req, res) {
    // TODO: Devolver un Teacher con sus courses, sólo seleccionaremos el id y title de los cursos 
    const id = req.params.id
    TeacherModel.findById(id)
    .populate("courses", "_id title")
    .then((teacher) => res.json(teacher))
    .catch((err) => res.json({ 
        err 
    }));
}

exports.createTeacher = function(req, res) {
     // TODO: Crear un Teacher
     const body = req.body;

     TeacherModel.create(body, function(err, newTeacher) {
         if (err) {
             return res.send(400, err);
         }
         return res.json(newTeacher);
     })

}

exports.updateTeacher = function(req, res) {
    // TODO: Actualizar Teacher (incluyendo courses)
    const id = req.params.id;
    const body = req.body;
    TeacherModel.findByIdAndUpdate({_id : id}, body )
        .then((teacher) => res.json(teacher))
        .catch((err) => res.status(400).json({ err }))
}

exports.assignCourses = function(req, res) {
    // TODO: Asignar courses a un teacher, se recibirá como arreglo "coursesIds"
    const id = req.params.id;
    const coursesIds = req.body.courses;
    TeacherModel.findByIdAndUpdate({_id : id}, {$set: {courses: coursesIds}} )
        .then((course) => res.json(course))
        .catch((err) => res.status(400).json({ err }))
}

exports.deleteTeacher = function(req, res) {
    // TODO: Borrar Teacher (si tiene courses, no se podrá borrar)
    const id = req.params.id;

    TeacherModel.findById(id)
    .then(function(teacher){
        if(teacher.courses.length > 0){

            return res.status(400).json({ error: "Cursos activos teacher"})
        }

        else {
            TeacherModel.remove({_id: id} , function(error, deleted){
                if(error){return res.json({ error })}
                return res.json({ message: "Eliminado correctamente"})
            })
        }
    })
    .catch((err) => res.json({ err }))
}