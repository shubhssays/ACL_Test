const bcrypt = require("bcrypt");
const Users = require("../models/Users");
const { read, create } = require("../helpers/jwt");
const saltRounds = 10;

module.exports = {
  createUser: function (req, res) {
    if (req.method == "POST") {
      let { username, fullname, password, role_name } = {
        ...req.params,
        ...req.query,
        ...req.body,
      };
      try {
        bcrypt.hash(password, saltRounds, function (err, hash) {
          if (err) {
            console.log("err", err);
            res.status(500).send({
              status: "failed",
              status: "Internal Server Error",
            });
          } else {
            Users.createUser({username, fullname, hash, role_name})
              .then((data) => {
                res.status(200).send({
                  status: "success",
                  status: "User Created Successfully",
                });
              })
              .catch((err) => {
                console.log("err", err);
                res.status(500).send({
                  status: "failed",
                  status: "Internal Server Error",
                });
              });
          }
        });
      } catch (err) {
        console.log("err", err);
        res.status(500).send({
          status: "failed",
          status: "Internal Server Error",
        });
      }
    }
  },

  login: function (req, res) {
    if (req.method == "POST") {
      let { username, password } = {
        ...req.params,
        ...req.query,
        ...req.body
      };
      console.log("username",username)
      console.log("password",password)
      try {
        Users.findOneForLogin({ username })
          .then((data) => {
            let result = data.rows[0];
            console.log("result",result)
            if (result != null || typeof result != "undefined") {
              if (bcrypt.compareSync(password, result.password)) {
                let user = {};
                (user.username = result.username),
                  (user.fullname = result.fullname),
                  (user.role_name = result.role_name),
                  (user.permission_details = result.permission_details);
                delete result.password;
                (async () => {
                  let jwtToken = await create(user);
                  console.log("jwtToken", jwtToken);
                  res.status(200).send({
                    status: "success",
                    data: user,
                    token: jwtToken,
                  });
                })();
              } else {
                res.status(401).send({
                  status: "failed",
                  message: "Unauthorised access...Password did not match",
                });
              }
            } else {
              res.status(404).send({
                status: "failed",
                message: "Invalid user...No such user",
              });
            }
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
          status: "Internal Server Error",
        });
      }
    } 
  },
};
