const User = require("../../models/user");

exports.createUser = async (req, res, next) => {
  console.log(req.body);
  //   const title = req.body.title;
  //   const imageUrl = req.body.imageUrl;
  //   const price = req.body.price;
  //   const description = req.body.description;
  //   const product = new Product({
  //     title: title,
  //     price: price,
  //     description: description,
  //     imageUrl: imageUrl,
  //     userId: req.user,
  //   });
  //   product
  //     .save()
  //     .then((result) => {
  //       // console.log(result);
  //       console.log("Created Product");
  //       res.redirect("/admin/products");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
};
