import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const encriptString =async (password) => {
  let hash=await bcrypt.hashSync(password, 10);
  return hash
};
export const comparePassword = async(password,hash) => {
  let status= await bcrypt.compare(password,hash)
  return status
};
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
