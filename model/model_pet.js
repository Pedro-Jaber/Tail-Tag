const mongoose = require("mongoose");
const { Schema } = mongoose;

const PetSchema = new Schema(
  {
    name: String,
    birthdate: String, // yyyy-MM-dd
    collar: {
      serialNumber: String,
      version: String,
    },
    gpsData: {
      time: [mongoose.Schema.Types.Date],
      latitude: [mongoose.Schema.Types.Decimal128],
      longitude: [mongoose.Schema.Types.Decimal128],
    },
  },
  { timestamps: true, collection: "pets" }
);

module.exports = mongoose.model("Pet", PetSchema);
