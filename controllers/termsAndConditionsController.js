const knex = require("../config/db");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const handlers = require("./handelerFactory");

exports.getAllTerms = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    knex("dba.qru_terms_and_conditions"),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doc = await features.query;

  // Process data to group by 'type' and collect languages
  const groupedData = doc.reduce((acc, row) => {
    const { type, language } = row;

    // Find the existing group for the current type
    const existingGroup = acc.find((item) => item.type === type);

    if (existingGroup) {
      // If group exists, push the language to the language array
      existingGroup.language.push(language);
    } else {
      // If no group exists, create a new one with this type and language
      acc.push({
        type,
        language: [language], // Initialize with current language
      });
    }

    return acc;
  }, []);

  res.status(200).json({
    status: "success",
    data: {
      data: groupedData, // Return the grouped data in the desired format
    },
  });
});
// exports.getOne = catchAsync(async (req, res, next) => {
//   const features = new APIFeatures(
//     knex("dba.qru_terms_and_conditions"),
//     req.query
//   )
//     .filter()
//     .sort()
//     .limitFields()
//     .paginate();

//   const doc = await features.query;

//   // Process data to group by 'type' and collect languages
//   const groupedData = doc.reduce((acc, row) => {
//     const { type, language } = row;

//     // Find the existing group for the current type
//     const existingGroup = acc.find((item) => item.type === type);

//     if (existingGroup) {
//       // If group exists, push the language to the language array
//       existingGroup.language.push(language);
//     } else {
//       // If no group exists, create a new one with this type and language
//       acc.push({
//         type,
//         language: [language], // Initialize with current language
//       });
//     }

//     return acc;
//   }, []);

//   res.status(200).json({
//     status: "success",
//     data: {
//       data: groupedData, // Return the grouped data in the desired format
//     },
//   });
// });
exports.getOne = handlers.getAll("dba.qru_terms_and_conditions");


// handlers.getAll("dba.qru_terms_and_conditions");
exports.getTerms = handlers.getOne("dba.qru_terms_and_conditions");
exports.createTerms = handlers.createOne("dba.qru_terms_and_conditions");
exports.updateTerms = handlers.updateOne("dba.qru_terms_and_conditions");
exports.deleteTerms = handlers.deleteOne("dba.qru_terms_and_conditions");
