import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";

import config from "../config";
import ApiError from "../../Error/ApiErrors";
import { jwtHelpers } from "../../Helpers/jwtHelpers";

const auth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Yor are not authorized");
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.jwt_secret as string
      );

      req.user = verifiedUser;

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          "Forbidden! You are not authorized!"
        );
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
