import express from "express";
import { getCharacter, searchCharacters } from "../controllers/swapiController";

const router = express.Router();

router.get("/character/:id", getCharacter);
router.get("/search", searchCharacters);

export default router;
