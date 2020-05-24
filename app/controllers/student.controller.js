const Student = require("../models/student.model.js");

const validator = require("../validate/validate_req.js");

// Create and Save a new student
exports.create = (req, res) => {
	if (!validator.validate(req.body)) {
		return res.status(400).json({
	        message: "Student info missed."
	    });
	}

	const student = new Student({
		name: req.body.name,
		age: req.body.age,
		faculty: req.body.faculty,
		email: req.body.email
	});

	student.save()
    .then((data) => {
        res.status(200).json({
        	message: "Create new student successfully"
        });
    })
    .catch((err) => {
        res.status(500).json({
            message: err.message
        });
    });
};

// Retrieve and return all students from the database.
exports.findAll = (req, res) => {
	Student.find()
	.then((students) => {
		res.status(200).json(students);
	})
	.catch((err) => {
		res.status(500).json({
            message: err.message
        });
	});
};

// Find a single student with a studentId
exports.findOne = (req, res) => {
	Student.findById(req.params.studentId)
    .then((student) => {
        if(!student) {
            return res.status(404).json({
                message: "Student not found with id " + req.params.studentId
            });            
        }
        res.status(200).json(student);
    }).catch((err) => {
        if(err.kind === "ObjectId") {
            return res.status(400).json({
                message: "Invalid id " + req.params.studentId
            });
        }
        
        res.status(500).json({
            message: err.message
        });
    });
};

// Update a student identified by the studentId in the request
exports.update = (req, res) => {
	if (Object.keys(req.body).length === 0) {
		return res.status(400).json({
	        message: "Update info missed."
	    });
	}

	Student.findByIdAndUpdate(req.params.studentId, req.body)
    .then((student) => {
    	if(!student) {
            return res.status(404).json({
                message: "Student not found with id " + req.params.studentId
            });            
        }

        res.status(200).json({
            message: "Update student successfully " + req.params.studentId
        });
    }).catch((err) => {
        if(err.kind === 'ObjectId') {
            return res.status(400).json({
                message: "Invalid id " + req.params.studentId
            });                
        }
        
        res.status(500).json({
            message: err.message
        });
    });
};

// Delete a student with the specified studentId in the request
exports.delete = (req, res) => {
	Student.findByIdAndRemove(req.params.studentId)
    .then((student) => {
        res.status(200).json({
        	message: "Student deleted successfully!"
        });
    }).catch((err) => {
        if(err.kind === 'ObjectId') {
            return res.status(400).json({
                message: "Invalid id " + req.params.studentId
            });                
        }
        
        res.status(500).json({
            message: err.message
        });
    });
};

// Delete all students from database
exports.deleteAll = (req, res) => {
	Student.deleteMany({})
	.then((result) => {
		res.status(200).json({
			"message": "Deleted " + result.deletedCount + " items"
		});
	})
	.catch((err) => {
		res.status(500).json({
            message: err.message
        });
	});
};
