const { countryList } = require("../utils/countryList");
const handlers = require("./handelerFactory");
exports.getAllCountries = handlers.getAll("dba.qru_country");
exports.getCountry = handlers.getOne("dba.qru_country");
exports.createCountries = async (req, res, next) => {
  try {
    // Insert each country in the list into the database
    await knex("dba.qru_country").insert(req.body);

    res.status(201).json({ message: "Countries inserted successfully!" });
  } catch (error) {
    console.error("Error inserting countries:", error);
    res
      .status(500)
      .json({ message: "An error occurred while inserting the countries." });
  }
};

handlers.createOne("dba.qru_country");
exports.updateCountry = handlers.updateOne("dba.qru_country");
exports.deleteCountry = handlers.deleteOne("dba.qru_country");
