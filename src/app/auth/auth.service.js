const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { AppError } = require("../error/AppError");
const { UserModel } = require("../modules/user/user.model");
const { sendEmail } = require("../utilities/sendEmail");

const loginUser = async (payload) => {
  const user = await UserModel.isUserExistByCustomId(payload.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "The user not found!");
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "The user already deleted!");
  }

  if (payload.password !== user.password) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "Password doesn't match");
  }

  if (user.status === "blocked") {
    throw new AppError(httpStatus.NOT_FOUND, "The user is blocked!");
  }

  const userPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(userPayload, config.jwt_secret, {
    expiresIn: "10d",
  });

  const refreshToken = jwt.sign(userPayload, config.jwt_refresh, {
    expiresIn: "10d",
  });

  return { user, accessToken, refreshToken };
};

const refresTokenService = async (token) => {
  const decoded = jwt.verify(token, config.jwt_refresh);

  const user = await UserModel.isUserExistByCustomId(decoded.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "The user not found!");
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "The user already deleted!");
  }

  if (user.status === "blocked") {
    throw new AppError(httpStatus.NOT_FOUND, "The user is blocked!");
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret, {
    expiresIn: "20d",
  });

  return accessToken;
};

const changePassworeService = async (payload, passwordData) => {
  const user = await UserModel.isUserExistByCustomId(payload.userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "The user not found!");
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "The user already deleted!");
  }

  if (user.status === "blocked") {
    throw new AppError(httpStatus.NOT_FOUND, "The user is blocked!");
  }

  if (passwordData.oldPassword !== user.password) {
    throw new AppError(httpStatus.FORBIDDEN, "Old password does not match");
  }

  await UserModel.findOneAndUpdate(
    { id: payload.userId, role: payload.role },
    {
      password: passwordData.newPassword,
      passwordChangedAt: new Date(),
    }
  );

  return null;
};

const forgetPasswordService = async (id) => {
  const user = await UserModel.isUserExistByCustomId(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "The user not found!");
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "The user already deleted!");
  }

  if (user.status === "blocked") {
    throw new AppError(httpStatus.NOT_FOUND, "The user is blocked!");
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const resetToken = jwt.sign(jwtPayload, config.jwt_secret, {
    expiresIn: "1h",
  });

  const resetUILink = `http://localhost:3000?id=${user.id}&token=${resetToken}`;
  sendEmail(user.email, resetUILink);

  return resetUILink;
};

const resetPassword = async (payload, token) => {
  const user = await UserModel.isUserExistByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted!");
  }

  if (user.status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked!");
  }

  const decoded = jwt.verify(token, config.jwt_secret);

  if (payload.id !== decoded.userId) {
    throw new AppError(httpStatus.FORBIDDEN, "You are forbidden!");
  }

  await UserModel.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: payload.newPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );

  return null;
};

module.exports = {
  loginUser,
  refresTokenService,
  changePassworeService,
  forgetPasswordService,
  resetPassword,
};
