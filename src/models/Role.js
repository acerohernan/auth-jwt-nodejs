const { Schema, model } = require("mongoose");

const roleSchema = new Schema(
  {
    name: String,
  },
  { versionKey: false }
);

const roleModel = model("role", roleSchema);

module.exports = roleModel;
