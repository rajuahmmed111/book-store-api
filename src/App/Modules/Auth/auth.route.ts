import express from "express";
import { AuthController } from "./auth.controller";
import auth from "../../Middleware/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

// login user
router.post("/login", AuthController.loginUser);

// refresh token
router.post("/refresh-token", AuthController.refreshToken);

// change password
router.post(
  "/change-password",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.AUTHOR),
  AuthController.changePassword
);

// forgot password
router.post(
  "/forgot-password",
  AuthController.forgotPassword
);

// reset password
router.post(
  "/reset-password/:token",
  AuthController.resetPassword
);

export const authRoute = router;
