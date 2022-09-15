require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const loginRouter = require("./app/routes/login")
const productRouter = require("./app/routes/product")

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

//Router Configuration
app.use("/", loginRouter);
app.use("/products", productRouter);

(async () => {
  app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, function () {
    console.log(
      `Server started at http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`
    );
  });
})();
