const mongoose = require('mongoose');
const TeacherModel = mongoose.model('Teacher');

exports.getAll = function(req, res) {
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

exports.createTeacher = function(req, res) {
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
    

}

exports.assignCourses = function(req, res) {
    // TODO: Asignar courses a un teacher, se recibirá como arreglo "coursesIds"
    const id = req.params.id;

    const courseIds = req.body.courseIds;

    TeacherModel.findById(id, function(err, course){
        if (err) {
            return res.status(400).json({ err });
        }
        
        if (!teacher) {
            return res.status(404).json({ err: "Teacher not found" });
        }

        teacher.course = courseIds;

        teacher.save(function(err, savedteacher) {
            return res.json(savedteacher);
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
        if(doc===null){
            return res.status(404).json("Teacher doesn't exist");
        }
        if(doc.courses){
            return res.status(400).json("Teacher with courses cannot be deleted");
        }
        return res.status(200).json("Teacher deleted successfully");
    })

}