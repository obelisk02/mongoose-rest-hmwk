const mongoose = require('mongoose');
const Pet = mongoose.model('Pet');


exports.getAll = function(req, res) {
    Pet.find(function (err, pets) {
        return res.json({ pets });
    });
}

exports.findOne = function(req, res) {
    const id = req.params.id;
    Pet.findById(id, function (err, pet) {
        if (err) {
            return res.status(400).json({ err });
        }
        if (!pet) {
            return res.status(404).json({ err: 'Not found' });
        }

        return res.json({ pet });
    });
}

exports.createPet = function(req, res) {
    const newPet = new Pet(req.body);

    newPet.save(function(err, pet) {
        if (err) {
            return res.status(400).json({ err });
        }

        return res.json({ newPet });
    });
}

exports.updatePet = function(req, res) {
    const id = req.params.id;
    const body = req.body;
    
    Pet.findByIdAndUpdate(id, body, function(err, pet){
        if (err) {
            return res.status(400).json({ err });
        }
        if (!pet) {
            return res.status(404).json({ err: 'Not found' });
        }
        
        return res.json({ pet });
    });
}

exports.deletePet = function(req, res) {
    const id = req.params.id;

    Pet.findByIdAndDelete(id, function(err, pet) {
        if (err) {
            return res.status(400).json({ err });
        }

        return res.json({ message: 'Deleted '});
    })
}