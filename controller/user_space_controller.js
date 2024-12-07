const User = require("../model/model_user");
const Pet = require("../model/model_pet");

function removeEmptyKeysFromJSON(jsonObj) {
  // Remove empty keys
  for (let key in jsonObj) {
    if (
      jsonObj[key] === "" ||
      jsonObj[key] === null ||
      jsonObj[key] === undefined
    ) {
      delete jsonObj[key]; // Delete the key with an empty string value
    } else if (typeof jsonObj[key] === "object" && jsonObj[key] !== null) {
      // Recursively handle nested objects or arrays
      removeEmptyKeysFromJSON(jsonObj[key]);
    }
  }

  // Remove empty objects
  for (let key in jsonObj) {
    if (typeof jsonObj[key] === "object") {
      if (Object.keys(jsonObj[key]).length === 0) {
        delete jsonObj[key];
      }
    }
  }
}

// user panel
module.exports.my_panel_get = async (req, res) => {
  const userId = req.decodedToken.context.user.id;

  //gets user from database
  const user = await User.findById(userId);

  // User not found
  if (!user) {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(400).redirect("/400");
    return;
  }

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

// Profile [GET]
module.exports.profile_get = async (req, res) => {
  // RAW user
  const userId = req.decodedToken.context.user.id;
  const user = await User.findById(userId);

  // User not found
  if (!user) {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(400).redirect("/400");
    return;
  }

  // Filtered user
  const userToFront = {
    id: user._id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    cpf: user.cpf,
    address: user.address,
    phone_number: user.phone_number,
  };

  // console.log(userToFront);

  res.status(200).render("user_pages/profile", { user: userToFront });
};

// Profile [PUT]
module.exports.profile_put = async (req, res) => {
  let user = {
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    cpf: req.body.cpf,
    address: {
      street: req.body.address_street,
      number: req.body.address_number,
      city: req.body.address_city,
      state: req.body.address_state,
      country: req.body.address_country,
      zip_code: req.body.address_zip_code,
    },
    phone_number: req.body.phone_number,
  };
  removeEmptyKeysFromJSON(user);

  // console.log(user);

  try {
    await User.updateOne(
      {
        _id: req.decodedToken.context.user.id,
      },
      {
        $set: user,
      }
    );
    res.status(200).json({ status: 200, message: "updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

// Profile [DELETE]
module.exports.profile_delete = async (req, res) => {
  const userId = req.decodedToken.context.user.id;

  console.log("Delete User: " + userId);

  try {
    //* Logout user;
    res.cookie("jwt", "", { maxAge: 1 });

    //* Delete Pets
    const userPetsList = await User.findById(userId, {
      pets: { petId: 1 },
    });
    // console.log(userPetsList.pets);

    userPetsList.pets.forEach(async (pet) => {
      // console.log(pet.petId);
      await User.updateOne(
        { _id: userId },
        { $pull: { pets: { petId: pet.petId } } }
      );
      await Pet.deleteOne({ _id: pet.petId });
    });

    //* Delete user
    await User.deleteOne({ _id: userId });

    //* Rsponse
    res.status(200).json({ status: 200, message: "deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

// pet profile
module.exports.my_pet_get = async (req, res) => {
  const petId = req.params.id;

  const pet = await Pet.findById(petId, {
    latitude: { $slice: -10 },
    longitude: { $slice: -10 },
  });

  // Pet not found
  if (!pet) {
    res.status(400).redirect("/400");
    return;
  }

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

// get a pet [GET]
module.exports.get_a_pet_get = async (req, res) => {
  const petId = req.params.id;

  const pet = await Pet.findById(petId);

  // Pet not found
  if (!pet) {
    res.status(400).json({ status: 400, message: "bad request" });
    return;
  }

  //console.log(`pet: ${pet}`);

  res.status(200).json(pet);
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

// edit pet [GET]
module.exports.edit_pet_get = async (req, res) => {
  const petId = req.params.id;

  const pet = await Pet.findById(petId);

  // Pet not found
  if (!pet) {
    res.status(404).redirect("/404");
    return;
  }

  res.status(200).render("pet_pages/edit_pet", { pet });
};

// edit pet [POST]
module.exports.edit_pet_post = async (req, res) => {
  const userId = req.decodedToken.context.user.id;
  const petId = req.params.id;

  // Verify if pet belongs to user
  let user;
  try {
    user = await User.findOne({
      _id: userId,
      pets: { $elemMatch: { petId: petId } },
    });
  } catch (error) {
    user = null;
    console.log(error);
  }

  if (!user) {
    res.status(400).json({ status: 400, message: "bad request" });
    return;
  }

  console.log(req.body);

  await Pet.updateOne(
    {
      _id: petId,
    },
    {
      $set: {
        name: req.body.name,
        birthdate: req.body.birthdate,
        collar: {
          serialNumber: req.body.collar_serialNumber,
        },
      },
    }
  );

  res.status(200).json({ status: 200, message: "created" });
};

// delete pet [DELETE]
module.exports.delete_pet_delete = async (req, res) => {
  const userId = req.decodedToken.context.user.id;
  const petId = req.params.id;

  // Verify if pet belongs to user
  let user;
  try {
    user = await User.findOne({
      _id: userId,
      pets: { $elemMatch: { petId: petId } },
    });
  } catch (error) {
    user = null;
    console.log(error);
  }

  if (!user) {
    res.status(400).json({ status: 400, message: "bad request" });
    return;
  }

  // Delete pet
  await Pet.deleteOne({ _id: petId });

  // Remove pet from user
  await User.updateOne(
    {
      _id: userId,
    },
    {
      $pull: { pets: { petId: petId } },
    }
  );

  res.status(200).json({ status: 200, message: "deleted" });
};
