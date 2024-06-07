const Location = require("../model/locationModel");

const saveLocation = async (req, res) => {
  const { managerId, longitude, latitude } = req.body;

  try {
    const location = new Location({ managerId, longitude, latitude });
    await location.save();
    res.status(201).send(location);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { saveLocation };
