const knex = require("../config/db");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const handlers = require("./handelerFactory");

// Function to create a new item
exports.createOrganization = catchAsync(async (req, res, next) => {
  const { name, email_integration, quotes_options } = req.body;

  // Basic validation
  if (!name) {
    return next(new AppError("Name is required", 400));
  }

  // Create a new item in the database
  const [newItem] = await knex("dba.qru_organizations")
    .insert({
      ...req.body,
      email_integration: JSON.stringify(email_integration),
      details: JSON.stringify(email_integration),
      quotes_options: JSON.stringify(quotes_options),
    })
    .returning("*");

  // Respond with the created item
  res.status(201).json({
    status: "success",
    data: {
      item: newItem,
    },
  });
});
exports.getAllOrganizations = handlers.getAll("dba.qru_organizations");

exports.getOrganization = handlers.getOne("dba.qru_organizations");
exports.updateOrganization = handlers.updateOne("dba.qru_organizations");
exports.deleteOrganization = handlers.deleteOne("dba.qru_organizations");
