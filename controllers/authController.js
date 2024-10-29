const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const { countryList } = require("../utils/countryList");
const knex = require("../config/db");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

const createCountries = async (countries) => {
  try {
    const values = countries
      .map(
        (country) =>
          `('${country.code}', '${country.name}', ${country.status}, '${country.company}', '${country.entity_code}', ${country.create_user}, ${country.update_user}, '${country.create_date}', '${country.update_date}')`
      )
      .join(",");

    const sql = `
      INSERT INTO dba.qru_country (code, name, status, company, entity_code, create_user, update_user, create_date, update_date)
      VALUES ${values};
    `;

    await knex.raw(sql);

    // await knex("dba.qru_country").insert(countries);

    console.log("created");
  } catch (error) {
    console.error("Error inserting countries:", error);
  }
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // console.log("email and password");

  // 2) Find the user in the database
  const user = await User.findByEmail(email);
  if (!user) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) Check if password matches
  const isMatch = await bcrypt.compare(password, user.user_pwd);
  if (!isMatch) {
    console.log("not match");
    return next(new AppError("Incorrect email or password", 401));
  }
  const countryExists = await knex("dba.qru_country")
    .where({ company: user.company, entity_code: user.entity_code })
    .first();

  if (countryExists) {
    console.log("exist");
  } else {
    const updatedCountries = countryList.map((country) => {
      return {
        ...country,
        company: user.company,
        entity_code: user.entity_code,
        create_user: user.id,
        update_user: user.id,
        create_date: new Date(Date.now()).toISOString(),
        update_date: new Date(Date.now()).toISOString(),
      };
    });
    // console.log("updatedCountries");
    // console.log(updatedCountries);
    createCountries(updatedCountries);
    console.log(" don't exist");
    // console.log(updatedCountries);
  }

  // 4) If everything is okay, send JWT token
  createSendToken(user, 200, res);
});
exports.signup = catchAsync(async (req, res, next) => {
  //   const { first_name, last_name, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  // Create a new user in the database
  const newUser = await User.create({ ...req.body, password: hashedPassword });

  createSendToken(newUser, 201, res);
});
exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};
