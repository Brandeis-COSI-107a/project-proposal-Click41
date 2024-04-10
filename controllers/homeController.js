// exports.respondWithName = (req, res) => {
//     res.render("index", { name: req.params.myName });
//   };

exports.login = (req, res) => {
  res.render("login");
};

exports.welcome = (req, res) => {
  let paramsName = req.params.myName;
  res.render("welcome", { name: paramsName });
};

exports.respondWithForm = (req, res) => {
  res.render("welcome", { name: req.body.myName });
};

// exports.displayForm = (req, res) => {
//   res.render("layout");
// }

// exports.respondWithForm = (req, res) => {
//   res.render("layout", { name: req.body.myName });
// };
