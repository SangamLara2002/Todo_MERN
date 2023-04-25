const mongoose = require("mongoose")

const ListSchema = mongoose.Schema({
    task: {
        type: String, 
        required: true,
    }, 
    desc: {
        type: String, 
        required: true,
    }
});
const list = mongoose.model('list0', ListSchema);
module.exports = list;