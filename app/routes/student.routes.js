module.exports = (app) => {
    const student = require("../controllers/student.controller.js");

    // Create a new student
    app.post("/students/create", student.create);

    // Retrieve all students
    app.get("/students/list", student.findAll);

    // Retrieve a single student with studentId
    app.get("/students/about/:studentId", student.findOne);

    // Update a student with studentId
    app.put("/students/edit/:studentId", student.update);

    // Delete a student with studentId
    app.delete("/students/delete/:studentId", student.delete);

    // Delete all students
    app.delete("/students/delete", student.deleteAll);
}
