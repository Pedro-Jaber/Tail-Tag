const User = require("../model/model_user");
const Pet = require("../model/model_pet");

// user panel
module.exports.my_panel_get = async (req, res) => {
  const userId = req.decodedToken.context.user.id;

  //gets user from database
  const user = await User.findById(userId);
  const userToFront = {
    id: user._id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    pets: user.pets,
  };
  // console.log(user);
  // console.log(userToFront);

  res.status(200).render("user_pages/my_panel", { user: userToFront });
};

// pet profile
module.exports.my_pet_get = async (req, res) => {
  const petId = req.params.id;

  const pet = await Pet.findById(petId, {
    latitude: { $slice: -10 },
    longitude: { $slice: -10 },
  });

  //console.log(pet);

  res.status(200).render("my_pet", { pet });
};

// pet edit profile [GET]
module.exports.my_pet_edit_get = (req, res) => {
  res.status(200).render("my_pet_edit");
};

// pet edit profile [POST]
module.exports.my_pet_edit_post = (req, res) => {
  res.status(200).render("my_pet_edit");
};

// add pet [GET]
module.exports.add_pet_get = (req, res) => {
  res.status(200).render("pet_pages/add_pet");
};

// add pet [POST]
module.exports.add_pet_post = async (req, res) => {
  //console.log(req.body);

  const name = req.body.name;
  const birthdate = req.body.birthdate;
  const serialNumber = req.body.serialNumber;
  //const version = req.body.version; // TODO get from database??

  const pet = await Pet.create({
    name: name,
    birthdate: birthdate,
    collar: {
      serialNumber: serialNumber,
      version: "1.0",
    },
  });

  const userId = req.decodedToken.context.user.id;

  await User.updateOne(
    {
      _id: userId,
    },
    {
      $push: { pets: { petId: pet._id } },
    }
  );

  res.status(200).json({ status: 200, message: "created" });
};

// get a pet [GET]
module.exports.get_a_pet_get = async (req, res) => {
  const petId = req.params.id;

  const pet = await Pet.findById(petId);

  //console.log(`pet: ${pet}`);

  res.status(200).json(pet);
};
