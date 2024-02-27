const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadProduct");
const {
  list,
  detail,
  edit,
  store,
  add,
  update,
  remove,
} = require("../controllers/productsController");
const productValidator = require("../validations/products-validator");
router
  .get("/", list)
  .get("/detail/:id", detail)
  .get("/editar/:id?", edit)
  .post("/crear",upload.fields([{ name: "image" }, { name: "imageBack" }]),productValidator,store)
  .get("/agregar", add)
  .put("/update/:id",upload.fields([{ name: "image" }, { name: "imageBack" }]),update)
  .delete("/remove/:id", remove);

module.exports = router;
