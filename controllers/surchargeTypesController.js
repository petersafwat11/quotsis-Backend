const handlers = require("./handelerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const knex = require("../config/db");
exports.createSurchargeType = catchAsync(async (req, res, next) => {
  const { name, general, translation, ltl } = req.body;

  // Basic validation
  if (!name) {
    return next(
      new AppError("Please provide a name for the surcharge type", 400)
    );
  }

  // Create a new surcharge type in the database
  const [newSurchargeType] = await knex("dba.qru_surcharge_type")
    .insert({
      ...req.body,
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

exports.getAllsurchargeTypes = handlers.getAll("dba.qru_surcharge_type");
exports.getsurchargeType = handlers.getOne("dba.qru_surcharge_type");
// exports.createsurchargeType = handlers.createOne("dba.qru_surcharge_type");
exports.updatesurchargeType = handlers.updateOne("dba.qru_surcharge_type");
exports.deletesurchargeType = handlers.deleteOne("dba.qru_surcharge_type");
