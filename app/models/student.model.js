const mongoose = require("mongoose");
require("mongoose-type-email");

const StudentSchema = mongoose.Schema({
    name: String,
    age: { type: Number, min: 18, max: 65 },
    faculty: String,
    email: {type: mongoose.SchemaTypes.Email, required: true}
}, {
    timestamps: true
});

module.exports = mongoose.model("Student", StudentSchema);