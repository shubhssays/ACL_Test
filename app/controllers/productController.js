const Users = require("../models/Users");
const Products = require("../models/Products");
const { read, create } = require("../helpers/jwt");

module.exports = {
  products: function (req, res) {
    if (req.method == "PUT") {
      let { product_name, price, quantity } = {
        ...req.params,
        ...req.query,
        ...req.body,
      };
      try {
        let created_by = req.body._user.username;
        Products.update({ product_name, price, quantity, created_by })
          .then((data) => {
            res.status(200).send({
              status: "success",
              message: "Product updated successfully",
            });
          })
          .catch((err) => {
            console.log("err", err);
            res.status(500).send({
              status: "failed",
              message: "Internal Server Error",
            });
          });
      } catch (err) {
        console.log("err", err);
        res.status(500).send({
          status: "failed",
          message: "Internal Server Error",
        });
      }
    } else if (req.method == "GET") {
      let {} = {
        ...req.params,
        ...req.query,
        ...req.body,
      };
      try {
        let created_by = req.body._user.username;
        Products.fetch()
          .then((data) => {
            res.status(200).send({
              status: "Products sent successfully",
              data: data.rows,
            });
          })
          .catch((err) => {
            console.log("err", err);
            res.status(500).send({
              status: "failed",
              message: "Internal Server Error",
            });
          });
      } catch (err) {
        console.log("err", err);
        res.status(500).send({
          status: "failed",
          message: "Internal Server Error",
        });
      }
    } else if (req.method == "POST") {
      let { product_name, price, quantity } = {
        ...req.params,
        ...req.query,
        ...req.body,
      };
      try {
        let created_by = req.body._user.username;
        Products.create({ product_name, price, quantity, created_by })
          .then((data) => {
            res.status(200).send({
              status: "Product added successfully”",
              data: data.rows,
            });
          })
          .catch((err) => {
            console.log("err", err);
            res.status(500).send({
              status: "failed",
              message: "Internal Server Error",
            });
          });
      } catch (err) {
        console.log("err", err);
        res.status(500).send({
          status: "failed",
          message: "Internal Server Error",
        });
      }
    } else if (req.method == "DELETE") {
      let { id } = {
        ...req.params,
        ...req.query,
        ...req.body,
      };
      try {
        let created_by = req.body._user.username;
        Products.delete({ created_by, id })
          .then((data) => {
            res.status(200).send({
              status: "Product deleted successfully",
              data: data.rows,
            });
          })
          .catch((err) => {
            console.log("err", err);
            res.status(500).send({
              status: "failed",
              message: "Internal Server Error",
            });
          });
      } catch (err) {
        console.log("err", err);
        res.status(500).send({
          status: "failed",
          message: "Internal Server Error",
        });
      }
    }
  },
};
