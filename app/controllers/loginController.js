module.exports = {
  login: function (req, res) {
    if (req.method == "GET") {
      let { username, password } = {
        ...req.params,
        ...req.query,
      };
      
    } else if (req.method == "POST") {
    }
  },
};
