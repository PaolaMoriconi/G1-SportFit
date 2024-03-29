const db = require("../database/models");
const { Op } = require("sequelize");
const { leerJSON } = require("../data");

module.exports = {
  index: async function (req, res) {
    
    const products = await db.Product.findAll({ include: [{association: "images"}]})

    return res.render("index", {
        products,
        user: req.session.userLogin,
      });
  },
  admin: (req, res) => {
    db.Product.findAll({
      include: [
        {
          association: "images",
        },
        {
          association: "categories",
        },
      ],
    }).then((products) => {
      return res.render("dashboard", {
        products,
        user: req.session.userLogin,
      });
    });
  },
  cart: (req, res) => {
    db.Product.findAll().then((products) => {
      const total = products.reduce((n1, n2) => n1 + n2.price, 0);

      const envio = 10000;

      res.render("products/carritoCompras", {
        products,
        user: req.session.userLogin,
        total,
        envio,
      });
    });
  },
  searchAdmin: (req, res) => {
    const { keyword } = req.query;
    db.Product.findAll({
      include: [
        {
          association: "images",
        },
        {
          association: "categories",
        },
      ],
      where: {
        name: { [Op.substring]: keyword },
      }
    }).then((products) => {
      console.log("buscador admin: ",products);
      return res.render("dashboard", {
        products,
        keyword,
        user: req.session.userLogin,
      });
    });
  },
  search: (req, res) => {
    const { keyword } = req.query;
    db.Product.findAll({
      include: [
        {
          association: "images",
        },
        {
          association: "categories",
        },
      ],
      where: {
        name: { [Op.substring]: keyword },
      }}).then((products) => {
      return res.render("index", {
        products,
        keyword,
        user: req.session.userLogin,
      });
    });
  },
};
