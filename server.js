const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

app.use(expressLayouts);
app.use(express.static("public"));

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to the database...");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", indexRouter);

app.listen(process.env.PORT || 3000, () =>
  console.log("Server is listening on port 3000...")
);
