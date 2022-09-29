const mongoose = require('mongoose');
const StudentModel = mongoose.model('Student');

exports.getAll = async function(req, res) {
    /* 
        MODO AWAIT 
    const allStudents = await StudentModel.find();

    return res.json(allStudents);
    */

    /*
     *  MODO CALLBACK
    StudentModel.find(
        function (err, docs) {
            if (err) {
                return res.status(400).json({ err });
            }

            return res.json(docs);
        }
    ); */

    StudentModel.find()
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

exports.findOne =  async function(req, res) {
    const id = req.params.id;

    StudentModel.findById(id, function(err, student) {
        if (err) {
            return res.status(400).json({ err });
        }

        if (!student) {
            return res.status(404).json({ err: "Student not found" });
        }

        return res.json(student);
    })
}

exports.createStudent = async function(req, res) {
    const body = req.body;

    StudentModel.create(body, function(err, newStudent) {
        if (err) {
            return res.status(400).json({ err });
        }

        return res.json(newStudent);
    })
}

exports.updateStudent = function(req, res) {
    const id = req.params.id;

    StudentModel.findByIdAndUpdate(id, req.body, null , function (err, student) {
        if (err) {
            return res.status(400).json({ err });
        }

        if (student === null) {
            return res.status(404).json({ err: "Student not found " });
        }
        
        return res.json(student);
    }) 
}

exports.deleteStudent = async function(req, res) {
    const id = req.params.id;

    StudentModel.findByIdAndRemove(id, function(err, doc) {
        if (err) {
            return res.status(400).json({ err });
        }

        return res.status(204).send();
    })
}


exports.searchByName = function(req, res) {
    const search = req.query.name;

    const query = {
        first_name: { $regex: search, $options: 'i' } // Busca por expresión regular,  'i'  es para ignorar mayusculas
    };

    StudentModel.find(query, function(err, docs) {
        if (err) {
            return res.status(400).json({ err });
        }

        return res.json(docs);
    });
}