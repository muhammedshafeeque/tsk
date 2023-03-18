import { createUser, getUserByEmail } from "../Services/user.Service.js";
import {
  comparePassword,
  encriptString,
  generateToken,
} from "../Utils/utils.js";

export const doSignup = async (req, res) => {
  try {
    let user = req.body;
    let userExist = await getUserByEmail(user.email);
    userExist
      ? res.status(400).send("Email Allready Exist")
      : ((user.password = await encriptString(user.password)),
        await createUser(user),
        res.status(200).send("User Registerd Successfully"));
  } catch (error) {
    res.status(500).send("error:" + error);
  }
};
export const doLogin = async (req, res) => {
  try {
    let user = await getUserByEmail(req.body.email);

    if (!user) {
      res.status(400).send("User not Found");
    } else {
      let validatePassword = await comparePassword(
        req.body.password,
        user.password
      );
      if (validatePassword) {
        res.send({
          name: user.name,
          email: user.email,
          token: await generateToken(user._id),
          id: user._id,
        });
      } else {
        res.status(400).send("Invalid Email Or Password");
      }
    }
  } catch (error) {
    res.status(500).send("error:" + error);
  }
};
export const sendReqUser = (req, res) => {
  res.send(req.user);
};
