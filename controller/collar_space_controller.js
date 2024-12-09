const { NMEAParser } = require("@coremarine/nmea-parser");
const Pet = require("../model/model_pet");

// Collar test [POST]
module.exports.collar_post = async (req, res) => {
  // console.log("Collar connected");
  //console.log("Body: ");
  //console.log(req.body);

  // request information
  const serialNumber = req.body.serialNumber;
  const GPGGA = req.body.$GPGGA + "\r\n";

  // NMEA parser
  const parser = new NMEAParser();
  const output = parser.parseData(GPGGA)[0];

  // GPGGA information
  const time = output.received;
  const latitude = output.metadata.latitude;
  const longitude = output.metadata.longitude;

  // console.log(serialNumber);
  // console.log(time);
  // console.log(latitude);
  // console.log(longitude);

  console.log(
    `[collar_post] ${serialNumber} | ${time} | ${latitude} | ${longitude}`
  );

  if (!serialNumber || !time || !latitude || !longitude) {
    // console.log("[collar_post] Error: missing information");
    res.status(400).send("400 Bad Request");
    return;
  }

  var pet;

  try {
    pet = await Pet.findOne({ "collar.serialNumber": serialNumber });

    await Pet.updateOne(
      {
        _id: pet._id,
      },
      {
        $push: {
          "gpsData.time": time,
          "gpsData.latitude": latitude,
          "gpsData.longitude": longitude,
        },
      }
    ).then(() => {
      //* Status 200 Updated
      res.status(200).json({ status: 200, message: "updated" });
    });
  } catch (error) {
    console.log("[collar_post] Error: " + error);

    //* Status 400 Bad Request
    if (pet === null) {
      res.status(400).send("400 Bad Request");
      return;
    }

    //* Status 500 Internal Server Error
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};
