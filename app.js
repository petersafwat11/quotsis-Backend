const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/usersRoutes");
const marginsRoutes = require("./routes/marginsRoutes");
const surchrgeTypesRoutes = require("./routes/surchageTypesRoutes");
const holidaysRoutes = require("./routes/holidaysRoutes");
const organanzationsRoutes = require("./routes/organizationRoutes");
const termsAndConditionsRoutes = require("./routes/termsAndConditionsRoutes");
const countriesRoutes = require("./routes/countriesRoutes");
const chargesRoutes = require("./routes/chargesRoutes");
const ratesRoutes = require("./routes/ratesRoutes");
const clientsRoutes = require("./routes/clientsRoutes");
const quotesRoutes = require("./routes/quotesRoutes");
const AppError = require("./utils/appError");

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to parse JSON requests
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/margins", marginsRoutes);
app.use("/api/surchrgeTypes", surchrgeTypesRoutes);
app.use("/api/organization", organanzationsRoutes);
app.use("/api/termsAndConditions", termsAndConditionsRoutes);
app.use("/api/countries", countriesRoutes);
app.use("/api/holidays", holidaysRoutes);
app.use("/api/charges", chargesRoutes);
app.use("/api/rates", ratesRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/quotes", quotesRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";

  res.status(statusCode).json({
    status: err?.status || "error",
    code: err?.statusCode || 500,
    message,
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
