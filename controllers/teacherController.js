const mongoose = require('mongoose');
const TeacherModel = mongoose.model('Teacher');

exports.getAll = function(req, res) {
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

exports.findOne = async function(req, res) {
    const id = req.params.id;
    TeacherModel.findById(id, function(err, teacher) {
        if (err) {
            return res.status(400).json({ err });
        }

        if (!teacher) {
            return res.status(404).json({ err: "Teacher not found" });
        }
        return res.json(teacher);
    }).populate("courses", "_id title");
}

exports.createTeacher = function(req, res) {
     const body = req.body;

    TeacherModel.create(body, function(err, newTeacher) {
        if (err) {
            return res.status(400).json({ err });
        }

        return res.json(newTeacher);
    })

}

exports.updateTeacher = function(req, res) {
    const id = req.params.id;

    TeacherModel.findByIdAndUpdate(id, req.body, null , function (err, teacher) {
        if (err) {
            return res.status(400).json({ err });
        }

        if (teacher === null) {
            return res.status(404).json({ err: "teacher not found " });
        }
        
        return res.json(teacher);
    }) 
    

}

exports.assignCourses = function(req, res) {
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
        teacher.save(function(err, savedteacher) {
            return res.json(savedteacher);
        })
    });
}

exports.deleteTeacher = function(req, res) {
    const id = req.params.id;

    TeacherModel.findById(id, function(err, doc) {
        if (err) {
            return res.status(400).json({ err });
        }
        if(doc===null){
            return res.status(404).json("Teacher doesn't exist");
        }
        if(doc.courses.length!=0){
            return res.status(400).json("Teacher with courses cannot be deleted");
        }
        doc.remove();
        return res.status(200).json("Teacher deleted successfully");
    })

}