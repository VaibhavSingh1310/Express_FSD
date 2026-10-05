const mongoose  = require('mongoose')
const studentSchema  = new mongoose.schema({
    user:
    {type:string,
    required: true
    },
    age:
    {
        type:number,
        required : true
    },
    course:
    {
        type:string,
        required : true
    }
    
})
const Student = mongoose.model("Student",studentSchema)
module.exports = Student