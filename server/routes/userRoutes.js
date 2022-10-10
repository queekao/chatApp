const {
  register,
  login,
  setAvatar,
  getAllUser,
} = require("../controllers/useController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/avatar/:id", setAvatar);
router.get("/allUser/:id", getAllUser);

module.exports = router;
