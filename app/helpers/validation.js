const e = require("express");
const { read, create } = require("../helpers/jwt");

exports.validate = async function (req, res, next) {
  console.log("tokennnn", req.headers["token"]);
  let tokenStatus = await read(req.headers["token"]);
  console.log("tokenStatus", JSON.stringify(tokenStatus));
  if (tokenStatus.status == "success") {
    let tokenData = tokenStatus.data.data.permission_details;
    req.body._user = tokenStatus.data.data
    if (req.method == "GET") {
      if (tokenData.toString().includes("fetch")) {
        next();
      } else {
        res.status(401).send({
          message: "Not authorized to access endpoint",
        });
      }
    } else if (req.method == "POST") {
      if (tokenData.toString().includes("create")) {
        next();
      } else {
        res.status(401).send({
          message: "Not authorized to access endpoint",
        });
      }
    } else if (req.method == "PUT") {
      if (tokenData.toString().includes("update")) {
        next();
      } else {
        res.status(401).send({
          message: "Not authorized to access endpoint",
        });
      }
    } else if (req.method == "DELETE") {
      if (tokenData.toString().includes("delete")) {
        next();
      } else {
        res.status(401).send({
          message: "Not authorized to access endpoint",
        });
      }
    }
  } else {
    res.status(401).send({
      message: "Not authorized to access endpoint",
    });
  }
};
