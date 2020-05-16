const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
  images: {type: Array},
  title: { type: String, min: 3, max: 20 },
  text: { type: String, min: 10 },
  type: {type: String, min:4, required: true}
});

const ContentModel = mongoose.model("Design45_Content", userSchema);

module.exports = ContentModel;
