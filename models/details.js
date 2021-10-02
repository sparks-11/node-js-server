const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const detailSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  crushName: {
    type: String,
    required: true
  },
  resultStmt: {
    type: String
  }
}, { timestamps:true})

const Details = mongoose.model("Details", detailSchema);

module.exports = Details;