//control API
const User = require("../model/userModel");
const brcypt = require("bcrypt"); //for encrypt the password
module.exports.register = async (req, res, next) => {
  //   console.log(req.body);
  try {
    const {username, email, password} = req.body;
    const usernameCheck = await User.findOne({username});
    if (usernameCheck)
      return res.json({msg: "Username already used", status: false});
    const emailCheck = await User.findOne({email});
    if (emailCheck) return res.json({msg: "Email already used", status: false});
    const hashedPassword = await brcypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password; //password is privacy stuff we need to use encrypt password
    return res.json({status: true, user});
  } catch (exception) {
    next(exception);
  }
};
module.exports.login = async (req, res, next) => {
  //   console.log(req.body);
  try {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if (!user)
      return res.json({msg: "Incorrect username or password", status: false});
    const isPasswordValid = await brcypt.compare(password, user.password); //compare the user enter password and database password
    if (!isPasswordValid)
      return res.json({msg: "Incorrect username or password", status: false});
    delete user.password; //password is privacy stuff we need to use encrypt password
    return res.json({status: true, user});
  } catch (exception) {
    next(exception);
  }
};
module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id; // get the params id
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      //find the user and update the data
      isAvatarImageSet: true,
      avatarImage,
    });
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (exception) {
    next(exception);
  }
};
module.exports.getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({_id: {$ne: req.params.id}}).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]); //return all the user but not the currentUser
    return res.json(users);
  } catch (exception) {
    next(exception);
  }
};
