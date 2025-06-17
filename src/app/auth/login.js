import jsonwebtoken from "jsonwebtoken";
import config from "../config/config";

let payload = {
  user: "athik",
  address: "chandpur",
  email: "mdathikhasa@.com",
};

jsonwebtoken.sign(
  payload,
  config.jwt_secret as string,
  function (err, token) {}
);
