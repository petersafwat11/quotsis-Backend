const handlers = require("./handelerFactory");

exports.getAllRates = handlers.getAll("dba.qru_rates");
exports.getRates = handlers.getOne("dba.qru_rates");
exports.createRates = handlers.createOne("dba.qru_rates");
// exports.createRates = catchAsync(async (req, res, next) => {
//   const {
//     notes,
//     restrictions,
//     surcharges,
//     locations,
//     restricted_postal_codes,
//     destination_locations,
//     origin_locations,
//   } = req.body;

//   // Basic validation
//   // Create a new surcharge type in the database
//   const [newSurchargeType] = await knex("dba.qru_surcharge_type")
//     .insert({
//       ...req.body,
//       general: JSON.stringify(general),
//       translation: JSON.stringify(translation),
//       ltl: JSON.stringify(ltl),
//     })
//     .returning("*");

//   res.status(201).json({
//     status: "success",
//     data: {
//       data: newSurchargeType,
//     },
//   });
// });

exports.updateRates = handlers.updateOne("dba.qru_rates");
exports.deleteRates = handlers.deleteOne("dba.qru_rates");
