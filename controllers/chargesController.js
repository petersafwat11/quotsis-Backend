const handlers = require("./handelerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const knex = require("../config/db");

exports.createCharge = catchAsync(async (req, res, next) => {
  const { name, general, translation, ltl } = req.body;

  // Basic validation
  if (!name) {
    return next(
      new AppError("Please provide a name for the surcharge type", 400)
    );
  }

  // Create a new surcharge type in the database
  const [newSurchargeType] = await knex("dba.qru_charges")
    .insert({
      name,
      general: JSON.stringify(general),
      translation: JSON.stringify(translation),
      ltl: JSON.stringify(ltl),
    })
    .returning("*");

  res.status(201).json({
    status: "success",
    data: {
      data: newSurchargeType,
    },
  });
});

exports.getAllCharges = handlers.getAll("dba.qru_charges");
exports.getCharge = handlers.getOne("dba.qru_charges");
exports.updateCharge = handlers.updateOne("dba.qru_charges");
exports.deleteCharge = handlers.deleteOne("dba.qru_charges");
