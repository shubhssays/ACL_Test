var jwt = require("jsonwebtoken");

exports.create = function (data) {
  return new Promise((resolve, reject) => {
    let result = jwt.sign(
      {
        data: data,
      },
      process.env.JWT_SECRET,
      { expiresIn: `${process.env.JWT_EXPIRES_IN_HOURS}h` }
    );
    resolve(result);
  });
};

exports.read = function (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        resolve({
          status: "failed",
          message: "Token expired. Please login again.",
        });
      } else {
        resolve({
          status: "success",
          data: decoded,
        });
      }
    });
  });
};
