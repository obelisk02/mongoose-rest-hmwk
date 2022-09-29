const mongoose = require('mongoose');
const TeacherModel = mongoose.model('Teacher');

exports.getAll = async function(req, res) {
    // TODO: Devolver todos los Teachers
    TeacherModel.find()
        .then(
            (data) => {
                return res.json(data);
            }
        )
        .catch(
            err => {
                return res.status(400).json({ err });
            }
        );


}

exports.findOne = function(req, res) {
    // TODO: Devolver un Teacher con sus courses, sólo seleccionaremos el id y title de los cursos 
    const id = req.params.id;

    TeacherModel.findById(id, function(err, teacher) {
        if (err) {
            return res.status(400).json({ err });
        }

        if (!teacher) {
            return res.status(404).json({ err: "Teacher not found" });
        }

        return res.json(teacher);
    })


}

exports.createTeacher = async function(req, res) {
     // TODO: Crear un Teacher
     const body = req.body;

     TeacherModel.create(body, function(err, newTeacher) {
         if (err) {
             return res.status(400).json({ err });
         }
 
         return res.json(newTeacher);
     })
}

exports.updateTeacher = function(req, res) {
    // TODO: Actualizar Teacher (incluyendo courses)
    const id = req.params.id;

    TeacherModel.findByIdAndUpdate(id, req.body, null , function (err, teacher) {
        if (err) {
            return res.status(400).json({ err });
        }

        if (teacher === null) {
            return res.status(404).json({ err: "Teacher not found " });
        }
        
        return res.json(teacher);
    }) 

}

exports.assignCourses = function(req, res) {
    // TODO: Asignar courses a un teacher, se recibirá como arreglo "coursesIds"
    const id = req.params.id;

    const coursesIds = req.body.coursesIds;

    TeacherModel.findById(id, function(err, teacher){
        if (err) {
            return res.status(400).json({ err });
        }
        
        if (!teacher) {
            return res.status(404).json({ err: "Teacher not found" });
        }

        teacher.courses = coursesIds;

        course.save(function(err, savedTeacher) {
            return res.json(savedTeacher);
        })
    });
}

exports.deleteTeacher = function(req, res) {
    // TODO: Borrar Teacher (si tiene courses, no se podrá borrar)

    const id = req.params.id;

    TeacherModel.findByIdAndRemove(id, function(err, doc) {
        if (err) {
            return res.status(400).json({ err });
        }

        return res.status(204).send();
    })

}