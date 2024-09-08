import express from "express";
import { body } from "express-validator";
import {
  getUsers,
  getUserById,
  createUser,
  login,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { validate } from "../middleware/validation";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post(
  "/",
  [
    body("email").isEmail(),
    body("name").notEmpty(),
    body("password").isLength({ min: 8 }),
  ],
  validate,
  createUser,
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty()],
  validate,
  login,
);

router.use(authenticate);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put(
  "/:id",
  [
    body("email").isEmail().optional(),
    body("name").notEmpty().optional(),
    body("password").isLength({ min: 8 }).optional(),
  ],
  validate,
  updateUser,
);
router.delete("/:id", deleteUser);

export default router;
