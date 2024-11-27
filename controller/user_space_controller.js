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

// add pet [POST]
module.exports.add_pet_post = async (req, res) => {
  console.log(req.body);

  const pet = await Pet.create({
    name: "Bolt",
    birthdate: Date.parse("2013-04-10"),
    latitude: [0],
    longitude: [0],
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

  res.status(200);
};

// get a pet [GET]
module.exports.get_a_pet_get = async (req, res) => {
  const petId = req.params.id;

  const pet = await Pet.findById(petId);

  //console.log(`pet: ${pet}`);

  res.status(200).json(pet);
};
